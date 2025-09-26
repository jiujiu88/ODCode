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

用例1
输入
abC124ACb
输出
4
说明
满足条件的最长子串是C124或者124A，长度都是4

用例2
输入
a5
输出
2
说明
字符串自身就是满足条件的子串，长度为2

用例3
输入
aBB9
输出
2
说明
满足条件的子串为B9，长度为2

用例4
输入
abcdef
输出
-1
说明
没有满足要求的子串，返回-1
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：滑窗记录字母数字个数，字母个数>1时缩小窗口，最后字母个数=1且有数字时记录结果
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const s = await readline();
    console.log(getRes(s));
})()

const getRes = (s)=>{
    let res = 0;
    // 记录字母、数字出现的次数
    let letterCnt = 0;
    let numCnt = 0;
    let left = 0;
    for(let i=0;i<s.length;i++){
        if(isNumber(s[i])){
            numCnt++;
        }else{
            letterCnt++;
        }
        //     如果字母个数大于1，则缩小窗口
        while(letterCnt>1){
            if(isNumber(s[left])){
                numCnt--;
            }else{
                letterCnt--;
            }
            left++;
        }
        //     如果字母个数=1且有数字，则记录结果
        if(letterCnt==1&&numCnt>0){
            res = Math.max(res,i-left+1);
        }
    }
    return res==0?-1:res;
}

const isNumber = (s)=>{
    return s>='0'&&s<='9';
}