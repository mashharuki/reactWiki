/**
 * メインコンポーネント定義ファイルです。
 */

// 必要なモジュールをインポートする。
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
// 編集画面と画面表示コンポーネントを読み込む
import WikiEdit from './wiki_edit';
import WikiShow from './wiki_show';

/**
 * WikiAppコンポーネントの定義
 */
const WikiApp = () => (
  <Router>
    <div>
      // WikiShowコンポーネントの挿入
      <Route path='/wiki/:name' component={WikiShow} />
      // WikiEditコンポーネントの挿入
      <Route path='/edit/:name' component={WikiEdit} />
    </div>
  </Router>
)

// DOMにメインコンポーネントを書き込む
ReactDOM.render(
  <WikiApp />,
  document.getElementById('root')
);
