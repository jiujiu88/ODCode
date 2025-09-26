/*
题目描述
给定一个正整数数组，设为nums，最大为100个成员，求从第一个成员开始，正好走到数组最后一个成员，所使用的最少步骤数。
要求：
第一步必须从第一元素开始，且1<=第一步的步长<len/2;（len为数组的长度，需要自行解析）。
从第二步开始，只能以所在成员的数字走相应的步数，不能多也不能少, 如果目标不可达返回-1，只输出最少的步骤数量。
只能向数组的尾部走，不能往回走。

输入描述
由正整数组成的数组，以空格分隔，数组长度小于100，请自行解析数据数量。

输出描述
正整数，表示最少的步数，如果不存在输出-1

用例
输入
7 5 9 4 2 6 8 3 5 4 3 9
输出
2
说明
第一步： 第一个可选步长选择2，从第一个成员7开始走2步，到达9；
第二步： 从9开始，经过自身数字9对应的9个成员到最后。

输入
1 2 3 7 1 5 9 3 2 1
输出
-1
说明
无

原文链接：https://blog.csdn.net/qq_33183456/article/details/131086155
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void (async ()=> {
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(arr));
})()

// 思路：
const getRes = (arr)=>{

}