/*
题目描述
一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0~N的箱子，每个箱子上面贴有一个数字。

阿里巴巴念出一个咒语数字k(k<N)，找出连续k个宝箱数字和的最大值，并输出该最大值。

输入描述
第一行输入一个数字字串，数字之间使用逗号分隔，例如：2,10,-3,-8,40,5

1 ≤ 字串中数字的个数 ≤ 100000
-10000 ≤ 每个数字 ≤ 10000
第二行输入咒语数字，例如：4，咒语数字大小小于宝箱的个数

输出描述
连续k个宝箱数字和的最大值，例如：39

用例1
输入
2,10,-3,-8,40,5
4
输出
39
用例2
输入
8
1
输出
8
输入
-7,-6,-6,-9
2
输出-12
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：滑窗找到长度为k的数字的最大和，入-更新-出
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(",").map(Number);
    const k = parseInt(await readline());
    console.log(getRes(arr,k));
})()

const getRes = (arr,k)=>{
    // ！！！有负数，res不能设置为0
    let res = -Infinity;
    let sum = 0;
    for(let i=0;i<arr.length;i++){
        sum +=arr[i];
        if(i+1<k) continue;
        res = Math.max(res,sum);
        sum -= arr[i-k+1];
    }
    return res;
}