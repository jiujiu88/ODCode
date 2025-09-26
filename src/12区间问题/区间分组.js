/*题目描述
给定 n 个区间 [ai,bi)，请你将这些区间分成若干组，使得每组内部的区间两两之间（包括端点）没有交集，
同时每组内部至多只能有 m 个区间，问最少分组数量是多少。

输入描述
第一行分组内部至多区间数量 m。
第二行输入 n 个区间，格式请见具体用例。注意区间皆为左闭右开。n 最大 1000。

输出描述
输出最少分组数量。

用例
输入
2
[[1, 2], [1, 2], [1, 2], [2, 3], [5, 6], [5, 6]]
输出
3
说明
最少可以分为三组：
第一组 [1, 2], [2, 3]
第二组 [1, 2], [5, 6]
第三组 [1, 2], [5, 6]

原文链接：https://blog.csdn.net/qfc_128220/article/details/128180152
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const m = parseInt(await readline());
    let arr = JSON.parse(await readline());
    console.log(getRes(m,arr));
})();

const getRes = (m,arr)=>{
    console.log(m,arr);
}