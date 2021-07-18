/**
 * Wiki編集画面用コンポーネント定義ファイル
 */

// 必要なモジュールを読み込む
import React, {Component} from 'react';
import request from 'superagent';
import {Redirect} from 'react-router-dom';
import styles from './styles';

/**
 * 編集画面コンポーネント
 */
export default class WikiEdit extends Component {
    // コンストラクター関数
    constructor (props) {
        super(props);
        const {params} = this.props.match;
        const name = params.name ;
        // ステート変数を定義
        this.state = {
            name,
            body: '',
            loaded: false,
            jump: ''
        };
    }

    // wikiの表示内容を読み込む関数
    componentWillMount () {
        request
            .get(`/api/get/${this.state.name}`)
            .end((err, res) => {
                if (err) return
                // 戻り値をセットする。
                this.setState({
                    body: res.body.data.body,
                    loaded: true
                });
            });
    }

    // 編集内容を保存するための関する
    save () {
        // wikiの名前を取得する。
        const wikiname = this.state.name
        // 更新APIを呼び出す。
        request
            .post('/api/put/' + wikiname)
            .type('form')
            .send({
                name: wikiname,
                body: this.state.body
            })
            .end((err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                // wikiページに遷移する。
                this.setState({jump: '/wiki/' + wikiname})
            });
    }

    // Wikiの内容が更新されたときに呼び出す関数
    bodyChanged (e) {
        // ステート変数の値を更新する。
        this.setState({body: e.target.value})
    }

    // レンダリングする
    render () {
        // 読み込み中の場合
        if (!this.state.loaded) {
          return (<p>読み込み中</p>)
        }
        // 遷移先が未指定の場合
        if (this.state.jump !== '') {
          // メイン画面にリダイレクト
          return <Redirect to={this.state.jump} />
        }
        // wikiの名前を取得する。
        const name = this.state.name
        // 描画する。
        return (
          <div style={styles.edit}>
            <h1>
                <a href={`/wiki/${name}`}>{name}</a>
            </h1>
            <textarea rows={12} cols={60} onChange={e => this.bodyChanged(e)} value={this.state.body} /><br />
            <button onClick={e => this.save()}>保存</button>
          </div>
        );
    }
}