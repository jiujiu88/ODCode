/*
题目描述
输入一个字符串s，它只包含a-z、A-Z、+、-以及合法的整数
合法的整数包括：
正整数由一个或者多个0-9组成，如0、2、3、002、102。
负整数以负号-开头，数字部分由一个或者多个0-9组成，如-0、-1、-123、-12345。

输入描述
包含数字的字符串。

输出描述
字符串中所有合法整数的最小和。

示例一
输入
bb1234aa
输出
10
说明
1+2+3+4=10

示例二
输入
bb12-34aa
输出
-31
说明
无
1+2+(-34)=-31

原文链接：https://blog.csdn.net/weixin_54707168/article/details/139536645
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const str = await readline();
    console.log(getRes(str));
})()

// 思路：
const getRes = (str)=>{
    console.log(str);

}