const rl = require("readline").createInterface({
    input :process.stdin
})
/*
给定一个含有 n 个正整数的数组和一个正整数 target 。
找出该数组中满足其总和大于等于 target 的长度最小的 子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
示例 1：
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 */
// 用滑窗
let lines = []
rl.on("line",line=> {
    lines.push(line);
    if (lines.length == 2) {
        const target = parseInt(lines[0]);
        const nums = JSON.parse(lines[1]);
        // let left = 0;
        // let sum = 0;
        // let res = Infinity;
        // for(let i=0;i<nums.length;i++){
        //     sum+=nums[i];
        //     while(sum>=target){
        //         res = Math.min(res,i-left+1);
        //         sum -=nums[left];
        //         left++;
        //     }
        // }
        // console.log(res==Infinity?0:res);
        let left = 0,right = 0;
        let res = Infinity;
        let sum = 0;
        while(left<=right && right<nums.length){
            sum +=nums[right];
            while(sum>=target){
                res = Math.min(res,right-left+1);
                sum -=nums[left];
                left++;
            }
            right++;
        }
        console.log(res==Infinity ? 0 : res);
        lines.length = 0;
    }
})