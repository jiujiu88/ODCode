/*
题目描述
给一个二维数组nums，对于每一个元素nums[i]，找出距离最近的且值相等的元素，输出横纵坐标差值的绝对值之和，如果没有等值元素，则输出-1。

输入描述
输入第一行为二维数组的行 输入第二行为二维数组的列 输入的数字以空格隔开。

输出描述
数组形式返回所有坐标值。

用例
输入
3 5 0 3 5 4 2 2 5 7 8 3 2 5 4 2 4
输出
[[-1, 4, 2, 3, 3], [1, 1, -1, -1, 4], [1, 1, 2, 3, 2]]
说明
无

原文链接：https://blog.csdn.net/hxyh888/article/details/144606108
 */

const rl = require("readline").createInterface({
    input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void (async ()=> {
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(arr));
})()

// 思路：
const getRes = (arr)=>{

}