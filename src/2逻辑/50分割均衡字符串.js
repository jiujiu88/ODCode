/*
题意
均衡串定义: 字符串只包含两种字符，且两种字符的个数相同。
给定一个均衡字符串，请给出可分割成新的均衡子串的最大个数。
约定字符串中只包含大写的X和Y两种字符。

输入
均衡串: XXYYXY
字符串的长度[2.100001。给定的字符串均为均衡串
输出
可分割为两个子串:
XXYY
XY
备注
分割后的子串，是原字符串的连续子串。
原文链接：https://blog.csdn.net/qq_52994629/article/details/134563625
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

// 思路：要分出无法再分的平衡串，从左到右直到XY出现次数相等，就是找到了。
const getRes = (str)=>{
    // console.log(str);
    let res = 0;
    let xCnt = 0,yCnt = 0;
    for(let v of str){
        if(v=="X"){
            xCnt++;
        }else{
            yCnt++;
        }
        if(xCnt==yCnt){
            res++;
        }
    }
    return res;
}