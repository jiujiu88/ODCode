/*
题目描述:
给定一个字符串s，最多只能进行一次变换，返回变换后能得到的最小字符串(按照字典序进行比较)。
变换规则:
交换字符串中任意两个不同位置的字符。

输入描述:
一串小写字母组成的字符串s

输出描述:
按照要求进行变换得到的最小字符串

补充说明:
s是都是小写字符组成
1<=s.length<=1000

示例1
输入
abcdef
输出
abcdef
说明
abcdef已经是最小字符串，不需要交换

示例2
输入
bcdefa
输出
acdefb
说明
a和b进行位置交换，可以等到最小字符串

原文链接：https://blog.csdn.net/lbp0123456/article/details/142657004
 */
const rl = require("readline").createInterface({
    input:process.stdin
})
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function() {
    const str = await readline();
    console.log(getRes(str));
}()

// 思路：
const getRes = (str)=>{
}