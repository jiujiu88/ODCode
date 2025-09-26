/*
题目描述
给定一个字符串s，找出这样一个子串：

该子串中任意一个字符最多出现2次
该子串不包含指定某个字符
请你找出满足该条件的最长子串的长度

输入描述
第一行为：要求不包含的指定字符，为单个字符，取值范围[0-9a-zA-Z]

第二行为：字符串s，每个字符范围[0-9a-zA-Z]，长度范围[1, 10000]

输出描述
一个整数，满足条件的最长子串的长度；

如果不存在满足条件的子串，则返回0

用例1
输入
D
ABC132
输出
6
用例2
输入
D
ABACA123D
输出
7
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：用map记录字符出现次数，滑窗记录结果，不满足字符则重置条件
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const except = await readline();
    const s = await readline();
    console.log(getRes(except,s));
})()

const getRes = (except,s)=>{
    // 用map记录元素出现次数
    let map = new Map();
    let res = 0;
    let left = 0;
    for(let i=0;i<s.length;i++){
        // 如果遇到不包含的字符，重置map和左指针位置
        if(s[i]==except){
            map = new Map();
            left = i+1;
        }else{
            map.set(s[i],(map.get(s[i])||0)+1);
            // ！！！如果元素出现次数大于2则缩小窗口，其实就是s[i]导致的，直接计算s[i]出现次数
            while(map.get(s[i])>2){
                map.set(s[left],(map.get(s[left])||0)-1);
                left++;
            }
            // 记录结果
            res = Math.max(res,i-left+1);
        }
    }
    return res;
}