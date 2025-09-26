/*
题目描述
现有一字符串仅由 ‘(‘，’)’，‘{‘，’}’，’[‘，’]’六种括号组成。
若字符串满足以下条件之一，则为无效字符串：
①任一类型的左右括号数量不相等；
②存在未按正确顺序（先左后右）闭合的括号。
输出括号的最大嵌套深度，若字符串无效则输出0。
0≤字符串长度≤100000

输入描述
一个只包括 ‘(‘，’)’，‘{‘，’}’，’[‘，’]’的字符串

输出描述
一个整数，最大的括号深度

用例
输入
[]
输出
1
说明
有效字符串，最大嵌套深度为1

输入
([]{()})
输出
3
说明
有效字符串，最大嵌套深度为3

输入
(]
输出
0
说明
无效字符串，有两种类型的左右括号数量不相等

输入
([)]
输出
0
说明
无效字符串，存在未按正确顺序闭合的括号

输入
)(
输出
0
说明
无效字符串，存在未按正确顺序闭合的括号。

原文链接：https://blog.csdn.net/m0_66793065/article/details/137870961
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const str = await readline();
    console.log(getRes(str));
})();

// 思路：最大括号深度就是栈内长度最长的长度
const getRes = (str)=>{
    let res = 0;
    let stack = [];
    const map = {")":"(","]":"[","}":"{"};
    for(let v of str){
        // 匹配括号
        if(stack.length && map[v]==stack[stack.length-1]){
            stack.pop();
        }else{
            stack.push(v);
            res = Math.max(res,stack.length);
        }
    }
    return stack.length>0 ? 0 : res;
}