/*
题目描述
给定一个url前缀和url后缀，通过",“分割，需要将其连接为一个完整的url，如果前缀结尾和后缀开头都没有”/“，
需要自动补上”/“连接符，如果前缀结尾和后缀开头都为”/"，需要自动去重，
约束：不用考虑前后缀URL不合法情况

输入描述
URL前缀(一个长度小于100的字符串)，URL后缀(一个长度小于100的字符串)

输出描述
拼接后的URL

示例1
输入
/acm,/bb
输出
/acm/bb

示例2
输入
/acm/,/bcd
输出
/acm/bcd

示例3
输入
/acd,bef
输出
/acd/bef
原文链接：https://blog.csdn.net/A_D_I_D_A_S/article/details/127274206
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [prefix,suffix] = (await readline()).split(",");
    console.log(getRes(prefix,suffix));
})()

// 思路：正则匹配 /要转义为\/，匹配一个或多个用+，匹配开头用^,匹配结尾用$
const getRes = (prefix,suffix)=>{
    // 将斜杠都去掉
    prefix = prefix.replace(/\/+$/, "");
    suffix = suffix.replace(/^\/+/, "");
    // console.log(prefix,suffix);
    return prefix+"/"+suffix;
}