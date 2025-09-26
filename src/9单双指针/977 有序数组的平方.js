const rl = require("readline").createInterface({
    input :process.stdin
})
/*
给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
示例 1：
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
 */
let lines = []
rl.on("line",line=>{
    const nums = JSON.parse(line);
    let res = [];
    let i = nums.length-1;
    let left = 0,right = nums.length-1;
    const square = (x)=>{return x*x}
    while(left<=right){
        if(square(nums[left])>square(nums[right])){
            res[i--] = square(nums[left]);
            left++;
        }else{
            res[i--] = square(nums[right]);
            right--;
        }
    }
    console.log(res);
})
