/**
 * 独自パーサー定義をテストするためのファイル
 */

// パーサを取り込む
const WikiParser = require('./src/wiki_parser.js');
// ソースコードをパース
const src = '*title\n\n-list1\n-list2\n\nhoge';
// 変換する。
const nodes = WikiParser.parse(src);
// 出力する。
console.log(nodes);

