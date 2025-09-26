/*
输入两个字符串S和L，都只包含英文小写字母。S长度<=100，L长度<=500,000。判定S是否是L的有效字串。
判定规则：S中的每个字符在L中都能找到（可以不连续），且S在Ｌ中字符的前后顺序与S中顺序要保持一致。
（例如，S="ace"是L="abcde"的一个子序列且有效字符是a、c、e，而"aec"不是有效子序列，且有效字符只有a、e）

输入描述:
输入两个字符串S和L，都只包含英文小写字母。S长度<=100，L长度<=500,000。
先输入S，再输入L，每个字符串占一行。

输出描述:
S串最后一个有效字符在L中的位置。（首位从0开始计算，无有效字符返回-1）

示例1
输入
ace
abcde
输出
4

示例2
输入
fgh
abcde
输出
-1

输入
aec
abcde
输出
4
原文链接：https://blog.csdn.net/weixin_40767375/article/details/126329477
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const s = await readline();
    const l = await readline();
    console.log(getRes(s,l));
})()

// 思路:快慢指针 !!!注意:不是要求s都是t的字串,而是s有多少有效字符在t中找到了,最后返回有效字符指向的t的索引
// S="ace"是L="abcde"的一个子序列且有效字符是a、c、e，而"aec"不是有效子序列，且有效字符只有a、e 应该返回最后一个有效字符e在t中的索引4
const getRes = (s,l)=>{
    // console.log(s,l);
    // S长度<=100，L长度<=500,000
    if(s>100 || l>500000) return -1;
    let res = -1;
    let slow = 0;
    for(let i=0;i<l.length;i++){
        if(l[i]===s[slow]){
            slow++;
            // 只要找到了有效字符,就记录索引
            res = i;
        }
    }
    return res;
}