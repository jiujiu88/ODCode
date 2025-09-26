/*
题目描述
输入两个字符串S和L，都只包含英文小写字母。S长度<=100，L长度<=500,000。

判定S是否是L的有效子串。

判定规则：

S中的每个字符在L中都能找到（可以不连续），且S在Ｌ中字符的前后顺序与S中顺序要保持一致。

（例如，S=”ace”是L=”abcde”的一个子序列且有效字符是a、c、e，而”aec”不是有效子序列，且有效字符只有a、e）

输入描述
输入两个字符串S和L，都只包含英文小写字母。S长度<=100，L长度<=500,000。

先输入S，再输入L，每个字符串占一行。

输出描述
S串最后一个有效字符在L中的位置。（首位从0开始计算，无有效字符返回-1）！！！

用例1
输入
ace
abcde
输出
4
用例2
输入
fgh
abcde
输出
-1

输入he
ehh
输出1
说明 不需要s时l的有效字串，只要找到s的最后一个有效字符在l中的位置，h出现在1，而e没有出现，返回1
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const s = await readline();
    const l = await readline();
    console.log(getRes(s,l));
})()

// 思路：循环L,i记录S的下标，相等时i++，记录此时的L下标，最后返回最后记录的L下标
const getRes = (s,l)=>{
    // 记录S的下标
    let i = 0;
    let lastIdx = -1;
    for(let j=0;j<l.length;j++){
        if(s[i]==l[j]){
            i++;
            // !!!不需要s是l的有效字串，只要求找到有效字符的位置即可
            lastIdx = j;
        }
    }
    return lastIdx;
}
