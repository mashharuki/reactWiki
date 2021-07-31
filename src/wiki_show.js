/**
 * Wiki画面表示用コンポーネント定義ファイル
 */

// 必要なモジュールを読み込む
import React, {Component} from 'react';
import request from 'superagent';
import WikiParser from './wiki_parser';
import styles from './styles';

/**
 * 画面表示コンポーネント
 */
export default class WikiShow extends Component {
    // コンストラクター関数
    constructor (props) {
        super(props);
        const {params} = this.props.match;
        // ステート変数を定義する。
        this.state = {
            name: params.name,
            body: '',
            loaded: false
        };
    }

    // Wikiの内容を読み込む関数
    componentWillMount () {
        request
            .get(`/api/get/${this.state.name}`)
            .end((err, res) => {
                if (err) return
                this.setState({
                    body: res.body.data.body,
                    loaded: true
                })
            })
    }

    // Wiki記法をReactオブジェクトに変換する関数
    convertText (src) {
        // Wiki記法をパースして配列データに変換
        const nodes = WikiParser.parse(src)
        // 各要素をReactの要素に変換
        const lines = nodes.map((e, i) => {
            // リスト
            if (e.tag === 'ul') {
                const lis = e.items.map(
                    (s, j) => <li key={`node${i}_${j}`}>{s}</li>
                )
                return <ul key={`node${i}`}>{lis}</ul>
            }
            if (e.tag === 'a') {
                return (
                    <div key={`node${i}`}>
                        <a href={`/wiki/${e.label}`}>→{e.label}</a>
                    </div>
                )
            }
            return React.createElement(
                e.tag, {key: 'node' + i}, e.label)
            }
        );
        // 変換したオブジェクトを返す。
        return lines;
    }
}
