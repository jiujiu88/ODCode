/*
题目描述
给定字符串 target和 source，判断 target是否为 source 的子序列。

你可以认为target和 source 中仅包含英文小写字母。

字符串 source 可能会很长（长度~=500,000），而 target是个短字符串（长度<=100)。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。

（例如，”abc”是”aebycd”的一个子序列，而”ayb”不是）。

请找出最后一个子序列的起始位置。

输入描述
第一行为target，短字符串（长度 <=100）

第二行为source，长字符串（长度 ~= 500,000）

输出描述
最后一个子序列的起始位置，即最后一个子序列首字母的下标

备注
若在source中找不到target，则输出-1。

用例1
输入
abc
abcaybec
输出
3
说明
这里有两个abc的子序列满足，取下标较大的，故返回3。
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const target = await readline();
    const source = await readline();
    console.log(getRes(target,source));
})()

// 思路：双指针 倒序循环，匹配完target就是最后一个子序列的首字母的下标
const getRes1 = (target,source)=>{
    let j = target.length-1;
    for(let i = source.length-1;i >= 0;i--){
        if(source[i] === target[j]){
            j--;
        }
        if(j < 0){
            return i;
        }
    }
    return -1;
}

// 思路：先将字符串全部翻转，再计算
const getRes = (target,source)=>{
    target = [...target].reverse().join("");
    source = [...source].reverse().join("");
    let j = 0;
    for(let i = 0;i <source.length;i++){
        if(source[i] === target[j]){
            j++;
        }
        if(j == target.length){
            return source.length-1-i;
        }
    }
    return -1;
}