/*
题目描述
给定两个字符串str1和str2，如果字符串str1中的字符，经过排列组合后的字符串中，只要有一个字符串是str2的子串，则认为str1是str2的关联子串。

若str1是str2的关联子串，请返回子串在str2的起始位置；

若不是关联子串，则返回-1。

输入描述
输入两个字符串，分别为题目中描述的str1、str2。

输出描述
若str1是str2的关联子串，请返回子串在str2的起始位置；

若不是关联子串，则返回-1。

若str2中有多个str1的组合子串，请返回最小的起始位置。

备注
输入的字符串只包含小写字母；
两个字符串的长度范围[1, 100000]之间；
用例1
输入
abc efghicbaiii
输出
5
说明
str2包含str1的一种排列组合（"cab")，此组合在str2的字符串起始位置为5（从0开始计数）

用例2
输入
abc efghiccaiii
输出
-1
说明
“abc”字符串中三个字母的各种组合（abc、acb、bac、bca、cab、cba），str2中均不包含，因此返回-1

输入abc abbccacb
输出5
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
rl.on("line",line=>{
    const [str1,str2] = line.split(" ");
    console.log(getRes(str1,str2));
})

// 滑窗法 判断出现次数一样时，用arr.every(v=>v==0)判断
const getRes = (str1,str2)=>{
    // 只包含小写字母，设置长度为26的数组
    let count = new Array(26).fill(0);
    const k = str1.length;
    const base = 'a'.charCodeAt();
    // 先记录str1中各字符出现的次数
    for(let v of str1){
        count[v.charCodeAt()-base]++;
    }
    // 在str2中找长度为k，且字符出现次数与str1一样的子串
    for(let i=0;i<str2.length;i++){
        // 入
        count[str2.charCodeAt(i)-base]--;
        if(i+1<k) continue;
        // ！！！更新 如果出现次数一样，返回起始位置i-k+1
        if(count.every(v=>v==0)){
            return i-k+1;
        }
        // 出
        count[str2.charCodeAt(i-k+1)-base]++;
    }
    // 如果没找到，返回-1
    return -1;
}

//尺取法
const getRes1 = (str1,str2)=>{
    // 只包含小写字母，设置长度为26的数组
    let count = new Array(26).fill(0);
    const k = str1.length;
    const base = 'a'.charCodeAt();
    // 先记录str1中各字符出现的次数
    for(let v of str1){
        count[v.charCodeAt()-base]++;
    }
    // 记录需要出现的字符个数
    let total = k;
    // 在str2中找长度为k，且字符出现次数与str1一样的子串
    for(let i=0;i<str2.length;i++){
        // 入
        if(count[str2.charCodeAt(i)-base]-->0){
            total--;
        }
        if(i+1<k) continue;
        // ！！！更新 如果出现次数一样，返回起始位置i-k+1
        if(total==0){
            return i-k+1;
        }
        // 出
        if(count[str2.charCodeAt(i-k+1)-base]++>=0){
            total++;
        }
    }
    // 如果没找到，返回-1
    return -1;
}