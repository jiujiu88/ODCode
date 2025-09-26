/*
题目描述
给一个正整数NUM1，计算出新正整数NUM2，NUM2为NUM1中移除N位数字后的结果，需要使得NUM2的值最小。

输入描述
1.输入的第一行为一个字符串，字符串由0-9字符组成，记录正整数NUM1，NUM1长度小于32。
2.输入的第二行为需要移除的数字的个数，小于NUM1长度。

输出描述
输出一个数字字符串，记录最小值NUM2。

用例
输入
2615371
4
输出
131

输入
7014
2
输出
1
说明：移除7和4，剩下01，由于没有前导0，因此为1

原文链接：https://blog.csdn.net/banxia_frontend/article/details/129951423
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const str = await readline();
    const k = parseInt(await readline());
    console.log(getRes(str,k));
})();

// 同leetcode 402 移掉k位数字  使移掉数字后值更小
const getRes = (str,k)=>{
    let stack = [];
    for(let v of str){
        // 要构造升序的数组  26015371
        while(stack.length && stack[stack.length-1]>v && k-->0){
            stack.pop();
        }
        // 前置0的场景,不要加到栈中
        if(stack.length==0 && v=="0"){
            continue;
        }
        stack.push(v);
    }
    // 如果k还没用完，升序数组，因此从后面开始删
    while(k-->0 && stack.length){
        stack.pop();
    }
    // 如果全移掉，就返回0
    return stack.join("") || "0";
}