/*
题目描述
对于一个连续正整数组成的序列，可以将其拼接成一个字符串，再将字符串里的部分字符打乱顺序。如序列8 9 10 11 12，拼接成的字符串为89101112，打乱一部分字符后得到90811211，原来的正整数10就被拆成了0和1。

现给定一个按如上规则得到的打乱字符的字符串，请将其还原成连续正整数序列，并输出序列中最小的数字。

输入描述
输入一行，为打乱字符的字符串和正整数序列的长度，两者间用空格分隔，字符串长度不超过200，正整数不超过1000，保证输入可以还原成唯一序列。

输出描述
输出一个数字，为序列中最小的数字。

用例1
输入
19801211 5
输出
8
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
rl.on("line",line=>{
    const [s,k] = line.split(" ");
    console.log(getRes(s+"",parseInt(k)));
})

var getRes = (s,k)=>{
    var log = "";
    // 设置数组记录每个字符 0-9
    let count = new Array(10).fill(0);
    // 先确认s的所有字符个数
    for(let v of s){
        count[v]++;
    }
    // 在1-1000中滑动，找字符个数，处理count，直到count的所有值都为0则找到了
    // !!!存在长度为200，初始值为801的用例，因此结束正整数可能为1000
    for(let i=1;i<=1000;i++){
        // 入
        for(let v of i+""){
            count[v]--;
        }
        if(i<k) continue;
        // 更新
        if(count.every(v=>v==0)){
            return i-k+1;
        }
        // 出
        for(let v of (i-k+1+"")){
            count[v]++;
        }
    }
    return -1;
}