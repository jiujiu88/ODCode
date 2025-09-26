/*
题目描述
一个图像有n个像素点，存储在一个长度为n的数组img里，每个像素点的取值范围[0,255]的正整数。
请你给图像每个像素点值加上一个整数k（可以是负数），得到新图newImg，使得新图newImg的所有像素平均值最接近中位值128。
请输出这个整数k。

输入描述
n个整数，中间用空格分开

输出描述
一个整数k

备注
1 <= n <= 100
如有多个整数k都满足，输出小的那个k；
新图的像素值会自动截取到[0,255]范围。当新像素值<0，其值会更改为0；当新像素值>255，其值会更改为255；
例如newImg=”-1 -2 256″,会自动更改为”0 0 255″

测试样例1
输入：
0 0 0 0
输出：
128
说明
四个像素值都为0

原文链接：https://blog.csdn.net/weixin_66855397/article/details/143726372
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