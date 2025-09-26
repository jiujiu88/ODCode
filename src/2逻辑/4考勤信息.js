/*
题目描述
公司用一个字符串来表示员工的出勤信息
absent：缺勤
late：迟到
leaveearly：早退
present：正常上班

现需根据员工出勤信息，判断本次是否能获得出勤奖，能获得出勤奖的条件如下：
缺勤不超过一次；
没有连续的迟到/早退；
任意连续7次考勤，缺勤/迟到/早退不超过3次。

输入描述
用户的考勤数据字符串
记录条数 >= 1；
输入字符串长度 < 10000；
不存在非法输入；

输出描述
根据考勤数据字符串，如果能得到考勤奖，输出”true”；否则输出”false”，

用例
输入
2
present
present present
输出
true true

输入
2
present
present absent present present leaveearly present absent
输出
true false

原文链接：https://blog.csdn.net/m0_46181452/article/details/131501111
 */
const rl = require("readline").createInterface({
    input:process.stdin
})
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function() {
    const n = parseInt(await readline());
    const arr = [];
    for(let i=0;i<n;i++){
        arr.push((await readline()).split(" "));
    }
    console.log(getRes(n,arr));
}()

// 思路：
const getRes = (n,arr)=>{

}