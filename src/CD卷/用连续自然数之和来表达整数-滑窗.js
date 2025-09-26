/*
题目描述
一个整数可以由连续的自然数之和来表示给定一个整数，计算该整数有几种连续自然数之和的表达式，且打印出每种表达式。

输入描述
一个目标整数T(1<=T<=1000)

输出描述
该整数的所有表达式和表达式的个数。如果有多种表达式，输出要求为:
自然数个数最少的表达式优先输出
每个表达式中按自然数递增的顺序输出，具体的格式参见样例。
在每个测试数据结束时，输出一行”Result:X”，其中X是最终的表达式个数。

用例：
输入
9
输出
9=9
9=4+5
9=2+3+4
Result:3
原文链接：https://blog.csdn.net/guorui_java/article/details/133710912
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const target = parseInt(await readline());
    getRes(target);
})()

// 思路：连续自然数，一次遍历，用滑窗计算和，如果跟target一样，返回结果
const getRes = (target)=>{
    // console.log(target);
    let sum = 0;
    let left = 1;
    let res = [];
    // let path = [];
    // 设置数组，内置数字为1-1000
    let path = Array(1000).fill(0).map((_,index)=>index+1);
    // 优化：不用循环到1000，right最大为target
    for(let i=1;i<=target;i++){
        sum +=i;
        // path.push(i);
        while(sum>target){
            sum -= left;
            // path.shift();
            left++;
        }
        // 记录结果
        if(sum===target){
            // 获取子串 path.slice(left-1,i);
            res.push(target+"="+path.slice(left-1,i).join("+"));
        }
    }
    // 按照长度升序 循环输出结果
    res.sort((a,b)=> a.length-b.length)
        .forEach((v)=>console.log(v));
    console.log("Result:",res.length);
}