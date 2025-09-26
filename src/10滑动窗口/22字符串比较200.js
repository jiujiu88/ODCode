/*
题目描述
给定字符串A、B和正整数V，A的长度与B的长度相等， 请计算A中满足如下条件的最大连续子串的长度：

该连续子串在A和B中的位置和长度均相同。
该连续子串|A[i] – B[i]|之和小于等于V。其中|A[i] – B[i]|表示两个字母​ASCII码之差的绝对值​。
输入描述
输入为三行：

第一行为字符串A，仅包含小写字符，1 <= A.length <=1000。
第二行为字符串B，仅包含小写字符，1 <= B.length <=1000。
第三行为正整数V，0<= V <= 10000。
输出描述
字符串最大连续子串的长度，要求该子串|A[i] – B[i]|之和小于等于V

用例1
输入
xxcdefg
cdefghi
5
输出
2
说明
字符串A为xxcdefg，字符串B为cdefghi，V=5。

它的最大连续子串可以是cd->ef,de->fg,ef->gh,fg->hi，所以最大连续子串是2。
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const a = await readline();
    const b = await readline();
    const v = parseInt(await readline());
    console.log(getRes(a,b,v));
})()

// 思路：理解题意，是要找出差值和小于等于v的连续子串  用双指针 先计算每个索引的差值，滑窗获取最长子串
const getRes = (a,b,v)=>{
    let res = 0;
//     定义差值集合
    let diffArr = [];
    let n = a.length;
    for(let i = 0;i < n;i++){
        diffArr.push(Math.abs(a.charCodeAt(i) - b.charCodeAt(i)));
    }
//     滑窗找到diffArr中连续且满足和小于等于v的最长子串
    let sum = 0;
    let left = 0;
    for(let i = 0;i < n;i++){
        sum += diffArr[i];
        while(sum > v){
            sum -= diffArr[left++];
        }
        res = Math.max(res,i-left+1);
    }
    return res;
}