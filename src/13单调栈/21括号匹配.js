/*
题目描述
给定一个字符串，里边可能包含“()”、“[]”、“{}”三种括号，请编写程序检查该字符串中的括号是否成对出现，且嵌套关系正确。
若括号成对出现且嵌套关系正确，或该字符串中无括号字符，输出：true；若未正确使用括号字符，输出：false。 实现时，无需考虑非法输入。

输入描述:
包含括号的算数表达式。

输出描述:
括号是否匹配

示例1
输入
(1+2)/(0.5+1)
输出
true

原文链接：https://blog.csdn.net/qq_39132095/article/details/129504791
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

// 思路：同20有效的括号
const getRes = (str)=>{
    const map = {")":"(","]":"[","}":"{"};
    let stack = [];
    for(let v of str){
        if([")","(","]","[","}","{"].includes(v)){
            if(stack.length && stack[stack.length-1] === map[v]){
                stack.pop();
            }else{
                stack.push(v);
            }
        }
    }
    return stack.length===0;
}