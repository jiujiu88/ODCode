/*
给定一个数组，编写一个函数来计算它的最大N个数与最小N个数的和。你需要对数组进行去重。
说明：
*数组中数字范围[0, 1000]---验证范围
*最大N个数与最小N个数不能有重叠，如有重叠，输入非法返回-1---验证2n>set长度
*输入非法返回-1 --输入n<=0

输入描述:
第一行输入M， M标识数组大小
第二行输入M个数，标识数组内容
第三行输入N，N表达需要计算的最大、最小N个数

输出描述:
输出最大N个数与最小N个数的和。

示例1
输入
5
95 88 83 64 100
2
输出
342

说明
最大2个数[100,95],最小2个数[83,64], 输出为342
示例2
输入
5
3 2 3 4 2
2
输出
11
原文链接：https://blog.csdn.net/weixin_40767375/article/details/125576019
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const m = parseInt(await readline());
    const list = (await readline()).split(" ").map(Number);
    const n = parseInt(await readline());
    console.log(getRes(m,n,list));
})()

// 思路：先用set去重，判断条件(见题目),[...set]升序，最后取前n位和后n位的和
const getRes = (m,n,list)=>{
    if(n<=0) return -1;
    let set = new Set();
    // 要去重，且范围是0-1000
    for(let v of list){
        if(v<0 || v>1000) return -1;
        set.add(v);
    }
    // 如果最大n个和最小n个一共2n个，如果长度不够，肯定重合，返回-1
    if(set.size<2*n) return -1;
    list = [...set].sort((a,b)=>a-b);
    return list.slice(0,n).reduce((a,b)=> a+b)+list.slice(list.length-n).reduce((a,b)=> a+b);
}