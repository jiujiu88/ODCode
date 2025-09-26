/*
题目描述：给定一个字符串 s ，找出这样一个子串：
1）该子串中的任意一个字符最多出现2次；
2）该子串不包含指定某个字符；
请你找出满足该条件的最长子串的长度。

输入描述：
第一行为要求不包含的指定字符，为单个字符，取值范围[0-9a-zA-Z]
第二行为字符串s，每个字符范围[0-9a-zA-Z]，长度范围[1,10000]

输出描述：
一个整数，满足条件的最长子串的长度；如果不存在满足条件的子串，则返回0

测试用例：
输入：
D
abc123
输出：
6
输入：
D
abaca123D
输出：
7
原文链接：https://blog.csdn.net/weixin_45668941/article/details/129850262
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const err = await readline();
    const s = await readline();
    console.log(getRes(err,s));
})()


// 思路：滑窗
const getRes = (err,s)=>{
    // console.log(err,s);
    const n = s.length;
    let map = new Map();
    let left = 0;
    let res = 0;
    for(let i=0;i<n;i++){
        // 如果遇到不能出现的字符，继续。
        if(s[i]===err){
            left = i;
            continue;
        }
        map.set(s[i],(map.get(s[i])||0)+1);
    //     当次数>2次时，缩小窗口
        while(map.get(s[i])>2){
            map.set(s[left],(map.get(s[left])||0)-1);
            left++;
        }
    //     记录结果
        res = Math.max(res,i-left+1);
    }
    return res;
}