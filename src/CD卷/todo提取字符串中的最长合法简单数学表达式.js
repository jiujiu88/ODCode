/*
题目描述
提取字符串中的最长合法简单数学表达式
计算表达式的值。如果没有，则返回0
简单数学表达式只能包含以下内容
0-9数字，符号/+-*
说明:
1.所有数字，计算结果都不超过long
2.如果有多个长度一样的，请返回第一个表达式的结果
3.数学表达式，必须是最长的，合法的
4.操作符不能连续出现，如 +--+1 是不合法的

输入描述
第一行为输入字符串

输出描述
最长数学表达式的结果

用例
输入
1-2abcd
输出
-1
原文链接：https://blog.csdn.net/KALA51773/article/details/132237061
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


const getRes = (str)=>{
    console.log(str);
//     正则匹配只有0-9,/+-*  数字 符号 数字
    const reg = /([+-]?(\d+[+-*])*\d+)/g;
    
}