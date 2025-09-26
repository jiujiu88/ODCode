/*
题目描述
给定两个整数数组array1和array2，数组元素按升序排列。假设从array1和array2中分别取出一个元素可构成一对元素。
现在需要取出K个元素对（即从两个数组中各取一个元素组成一个对，共取K个这样的对），并对取出的所有元素求和，计算和的最小值。
注意：两对元素如果对应于array1和array2中的两个下标均相同，则视为同一个元素对，不能重复使用。

输入描述
输入两行数组array1和array2，每行首个数字为数组大小size（0 < size <= 100），
接下来是数组的元素，满足0 < array1[i] <= 1000且0 < array2[i] <= 1000。
接下来一行为正整数k（0 < k <= array1.size() * array2.size()）。

输出描述
输出满足要求的最小和。

示例：
输入
3 1 1 2
3 1 2 3
2
输出
4

原文链接：https://blog.csdn.net/lbp0123456/article/details/142652409
 */
const rl = require("readline").createInterface({
    input:process.stdin
})
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function() {
    const arr1 = (await readline()).split(" ").map(Number);
    const arr2 = (await readline()).split(" ").map(Number);
    const k = parseInt(await readline());
    console.log(getRes(arr1,arr2,k));
}()

// 思路：暴力循环 参考373 查找和最小的k对数字
const getRes = (arr1,arr2,k)=>{

}