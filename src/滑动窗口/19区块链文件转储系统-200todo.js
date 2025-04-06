/*
题目描述
区块链底层存储是一个链式文件系统，由顺序的N个文件组成，每个文件的大小不一，依次为F1,F2,...,Fn。随着时间的推移，所占存储会越来越大。
云平台考虑将区块链按文件转储到廉价的SATA盘，只有连续的区块链文件才能转储到SATA盘上，且转储的文件之和不能超过SATA盘的容量。
假设每块SATA盘容量为M，求能转储的最大连续文件之和。

输入描述
第一行为SATA盘容量M，1000 ≤ M ≤ 1000000
第二行为区块链文件大小序列F1,F2,...,Fn。其中 1 ≤ n ≤ 100000，1 ≤ Fi ≤ 500

输出描述
求能转储的最大连续文件大小之和

用例1
输入
1000
100 300 500 400 400 150 100
输出
950
说明
最大序列和为950，序列为[400,400,150]

用例2
输入
1000
100 500 400 150 500 100
输出
1000
说明
最大序列和为1000，序列为[100,500,400]
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const m = parseInt(await readline());
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(m,arr));
})()

const getRes = (m,arr)=>{
    let res = 0;
    let sum = 0;
    let left = 0;
    for(let i=0;i<arr.length;i++){
        sum += arr[i];
        while(sum>m){
            sum -=arr[left++];
        }
        res = Math.max(res,sum);
    }
    return res;
}