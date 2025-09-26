/*
题目描述
给定一个字符串，只包含字母和数字，按要求找出字符串中的最长（连续）子串的长度，字符串本身是其最长的子串，子串要求：
1、 只包含1个字母(a~z, A~Z)，其余必须是数字；
2、 字母可以在子串中的任意位置；
如果找不到满足要求的子串，如全是字母或全是数字，则返回-1。

输入描述
字符串(只包含字母和数字)

输出描述
子串的长度

用例
输入
abC124ACb
输出
4
说明
满足条件的最长子串是C124或者124A，长度都是4
原文链接：https://blog.csdn.net/u012657708/article/details/131269203
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

// 思路：滑窗
const getRes = (s)=>{
    const isLetter = (x)=>{
        return (x>="a" && x<="z") || (x>="A" && x<="Z");
    }
    const n = s.length;
    let count = 0;
    let left = 0;
    let res = -1;
    for(let i=0;i<n;i++){
        count += isLetter(s[i]) ? 1 : 0;
        // 当字母次数>1次时，缩小窗口
        while(count>1){
            // 先计算，后加减
            count -= isLetter(s[left]) ? 1 : 0;
            left++;
        }
        //  记录结果，必须要有一个数字,因此总长度要大于1才记录结果
        if(count===1 && i-left+1>1) {
            res = Math.max(res, i - left + 1);
        }
    }
    return res;
}