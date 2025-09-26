/*
题目描述
给定一个有序数组 nums，以及一个元素 num，请你找打元素 num 在 nums 中的有序插入位置。

输入描述
第一行输入一个有序数组 nums，数组元素之间以空格分隔。注意数组中不存在重复元素。

第二行输入一个整数 num。注意 num 不与 nums 中任何元素相同。

输出描述
输出 num 在 nums 中的有序插入位置。

用例
输入
2 4 6 8 10 12 14
7
输出
3
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function(){
    const nums = (await readline()).split(" ").map(Number);
    const num = parseInt(await readline());
    // 下标从1开始
    console.log(getRes(nums,num)+1)
})()

const getRes = (nums,num)=>{
    // 二分法
    let left = 0,right = nums.length-1;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(nums[mid]>=num){
            // 找第一个>=num的数，即mid=right+1
            right = mid-1;
        }else{
            left = mid +1;
        }
    }
    // left = right+1;
    return left;
}