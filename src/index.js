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
      <Switch>
        <Route path='/wiki/:name' component={WikiShow} />
        <Route path='/edit/:name' component={WikiEdit} />
      </Switch>
    </div>
  </Router>
)

// DOMにメインコンポーネントを書き込む
ReactDOM.render(<WikiApp />, document.getElementById('root'));
