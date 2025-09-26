/*
题目描述
所谓水仙花数，是指一个n位的正整数，其各位数字的n次方和等于该数本身。例如，153是一个3位数，且153=13+53+3^3，所以153是一个水仙花数。

输入描述
第一行输入一个整数n，表示一个n位的正整数，n在3到7之间（包含3和7）。
第二行输入一个整数m，表示需要返回第m个水仙花数。返回长度是n的第m个水仙花数，个数从0开始编号。

输出描述
返回长度是n的第m个水仙花数。个数从0开始编号。
若m大于水仙花数的个数，返回最后一个水仙花数和m的乘积。
若输入不合法，返回-1。

示例1
输入
3
0
输出
153
说明：
153是第一个水仙花数.

示例2
输入
9
1
输出
-1
说明
9超出范围

原文链接：https://blog.csdn.net/lbp0123456/article/details/144183145
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const m = parseInt(await readline());
    console.log(getRes(n,m));
})()

// 思路：
const getRes = (n,m)=>{
    console.log(n,m);

}