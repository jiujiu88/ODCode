/*
题目描述
在通信系统中，一个常见的问题是对用户进行不同策略的调度，会得到不同的系统消耗和 性能。
假设当前有n个待串行调度用户，每个用户可以使用 A/B/C 三种不同的调度策略，不同的策略会消耗不同的系统资源。
请你根据如下规则进行用户调度，并返回总的消耗资源数。
规则:
1、相邻的用户不能使用相同的调度策略，例如，第1个用户使用了 A策略，则第2 个用户只能使用 B或者 C 策略.
2、对单个用户而言，不同的调度策略对系统资源的消耗可以归一化后抽象为数值。例如，某用户分别使用 A/B/C 策略的系统消耗分别为 15/8/17。
3、每个用户依次选择当前所能选择的对系统盗源消耗最少的策略(局部最优)，如果有多个满足要求的策略，选最后一个。

输入描述
第一行表示用户个数 n，接下来每一行表示一个用户分别使用三个策略的系统消耗 resA、resB、resC。

输出描述
最优策略组合下的总的系统资源消耗数。

示例1
输入：
3
15 8 17
12 20 9
11 7 5
输出：
24
示例说明：
1号用户使用 B策略，2号用户使用C策略，3号用户使用B策略。系统资源消耗:8+9+7=24。
备注: 所有策略对系统的资源消耗均为正整数，n<1000。

示例2
输入：
3
1 2 3
4 5 6
7 8 9
输出：
13

原文链接：https://blog.csdn.net/lovely_compiler/article/details/146256967
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const arr = [];
    for(let i=0;i<n;i++){
        arr.push((await readline()).split(" ").map(Number));
    }
    console.log(getRes(n,arr));
})()

// 思路：
const getRes = (n,arr)=>{
    console.log(n,arr);

}