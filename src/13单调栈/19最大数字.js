/*
组成最大数
小组中每位都有一张卡片，卡片上是6位内的正整数，将卡片连起来可以组成多种数字，计算组成的最大数字。

输入描述
“,”号分割的多个正整数字符串，不需要考虑非数字异常情况，小组最多25个人。

输出描述
最大的数字字符串

用例1
输入
22,221
输出
22221

用例2
输入
4589,101,41425,9999
输出
9999458941425101

原文链接：https://blog.csdn.net/banxia_frontend/article/details/130901124
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(",").map(Number);
    console.log(getRes(arr));
})()

// 思路：找出最大的，设置索引i，遍历字符串，当前位相同则i++，直到找到更大的，则加入结果
const getRes = (arr)=>{
    let stack = [];
    let res = [];
    let max = 0;
    let i = 0;
    for(let v of arr){
        if(v[i]>max){

        }
    }

}