/**
 * wikiアプリケーション用のWebサーバー設定ファイル
 */

// 必要なモジュールをインポートする。
const path = require('path');
const NeDB = require('nedb');
const express = require('express');
const bodyParser = require('body-parser');
// DBに接続する。
const db = new NeDB({
    filename: path.join(__dirname, 'wiki.db'),
    autoload: true
});

// WEBサーバを起動する。
const app = express();
// ポート番号する。
const portNo = 3001;
// body-parserを有効にする。
app.use(bodyParser.urlencoded({extended: true}))
// 起動する。
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})

/**
 * Wikiデータを返すAPI
 */
app.get('/api/get/:wikiname', (req, res) => {
  // wikiの名称を取得する。
  const wikiname = req.params.wikiname
  // DBから該当データをselectする。
  db.find({name: wikiname}, (err, docs) => {
    if (err) {
      res.json({
        status: false,
        msg: err
       });
      return
    }
    if (docs.length === 0) {
      docs = [{name: wikiname, body: ''}];
    }
    res.json({
        status: true,
        data: docs[0]
    });
  })
})

/**
 * Wikiデータを書き込むAPIの定義
 */
app.post('/api/put/:wikiname', (req, res) => {
　　// wikiの名称を取得する。
  const wikiname = req.params.wikiname
  console.log('/api/put/' + wikiname, req.body)
  // 既存のエントリがあるか確認（存在する場合は、docsに格納する。）
  db.find({'name': wikiname}, (err, docs) => {
    if (err) {
      res.json({
        status: false,
        msg: err
      });
      return
    }

    const body = req.body.body

    if (docs.length === 0) {
      // エントリがなければ挿入
      db.insert({name: wikiname, body})
    } else {
      // 既存のエントリを更新
      db.update({name: wikiname}, {name: wikiname, body})
    }
    res.json({status: true});
  })
})

// publicディレクトリを自動で返す
app.use('/wiki/:wikiname', express.static('./public'))
app.use('/edit/:wikiname', express.static('./public'))
// フロント画面にリダイレクトする。
app.get('/', (req, res) => {
  res.redirect(302, '/wiki/FrontPage')
})