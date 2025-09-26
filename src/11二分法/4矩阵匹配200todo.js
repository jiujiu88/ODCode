/*
问题描述
给定一个大小为 ( N \times M )（( N \leq M )）的矩阵，从中选出 ( N ) 个数，要求任意两个数字不能在同一行或同一列。求选出来的 ( N ) 个数中第 ( K ) 大的数字的最小值。

输入描述
输入矩阵要求：( 1 \leq K \leq N \leq M \leq 150 )
输入格式：
第一行：( N ) ( M ) ( K )
接下来 ( N ) 行：( N \times M ) 矩阵
输出描述
输出从矩阵中选出的 ( N ) 个数中第 ( K ) 大的数字的最小值。
用例
输入
3 4 2
1 5 6 6
8 3 4 3
6 8 6 3
输出
3
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const requirements = (await readline()).split(" ").map(Number);
    const k = parseInt(await readline());
    console.log(getRes(requirements,k))
}()

// 思路:
const getRes = (requirements,k)=>{

}