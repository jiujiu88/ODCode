/*
题目描述
给出数字K,请输出所有结果小于K的整数组合到一起的最少交换次数。

组合一起是指满足条件的数字相邻，不要求相邻后在数组中的位置。

数据范围：

-100 <= K <= 100
-100 <= 数组中数值 <= 100
输入描述
第一行输入数组：1 3 1 4 0

第二行输入K数值：2

输出描述
第一行输出最少交换次数：1

用例1
输入
1 3 1 4 0
2
输出
1
说明
小于2的表达式是1 1 0, 共三种可能将所有符合要求数字组合一起，最少交换1次。
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：计算小于k的元素的个数n，在数组中固定长度n进行滑窗，记录每段中大于等于k的元素个数，表示需要交换的元素个数，取最少的
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(" ");
    const k = parseInt(await readline());
    console.log(getRes(arr,k));
})()

const getRes = (arr,k)=>{
    // 计算小于k的元素个数，即确认滑窗的长度
    const n = arr.filter(v=>v<k).length;
    // 结果最多交换n次
    let res = n;
    // 记录大于等于k的元素个数
    let count = 0;
    // 在数组arr中滑窗，固定长度为n，记录大于等于k的元素个数为res，找最小的res
    for(let i=0;i<arr.length;i++){
        // 入
        count +=arr[i]>=k?1:0;
        if(i+1<n) continue;
        // 更新
        res = Math.min(res,count);
        // 出
        count -=arr[i+1-n]>=k?1:0;
    }
    return res;
}