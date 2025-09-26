/*
题目描述
存在一种虚拟IPv4地址，由4小节组成，每节的范围为0~255，以#号间隔，虚拟IPv4地址可以转换为一个32位的整数，例如：
128#0#255#255，转换为32位整数的结果为2147549183（0x8000FFFF）
1#0#0#0，转换为32位整数的结果为16777216（0x01000000）

输入描述
输入一行，虚拟IPv4地址格式字符串

输出描述
输出一行，按照要求输出整型或者特定字符

示例1
输入
100#101#1#5
输出
1684340997

输入
1#2#3
输出
invalid IP

原文链接：https://blog.csdn.net/lihuhelihu/article/details/143972256
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