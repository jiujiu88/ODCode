/*
给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。
示例 1：
输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4
输出： True
说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
示例 2:
输入: nums = [1,2,3,4], k = 3
输出: false
 */
// 第几个球/桶数组/每个桶的容量/球数组   注意判断:不能均分或者桶容量<最大球  递归 桶容量去重
const rl = require("readline").createInterface({
    input :process.stdin
})
let lines = [];
rl.on("line",line=> {
    lines.push(line);
    if (lines.length == 2) {
        let nums = JSON.parse(lines[0]);
        let k = parseInt(lines[1]);
        console.log(getRes(nums,k));
        lines.length = 0;
    }
})
const getRes = (nums,k)=>{
    // 排序,计算总数
    let sum = nums.sort((a,b)=>b-a).reduce((a,b)=>a+b);
    // 不能均分或者最大的比总数大,都不能均分
    if(sum%k!=0 || sum/k<nums[0]){
        return false;
    }
    let buckets = new Array(k).fill(0);
    return splitNums(0,buckets,nums,sum/k)
}
// 5 4 3 3 2 2 1
const splitNums = (index,buckets,nums,sum)=>{
    if(index == nums.length){
        return true;
    }
    for(let i=0;i<buckets.length;i++){
        if(buckets[i]+nums[index]>sum) continue;
        if(i>0 && buckets[i] == buckets[i-1]) continue;
        buckets[i] +=nums[index];
        if(splitNums(index+1,buckets,nums,sum)) return true;
        buckets[i] -=nums[index];
    }
    return false;
}
