const rl = require("readline").createInterface({
    input:process.stdin
})
/*
给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。
示例 1：
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
 */
const lines = [];
rl.on("line",line=>{
    const nums = JSON.parse(line);
    let l =0,r=nums.length-1;
    // 固定一个数,两个指针在i的右侧左右滑动
    // 去重   i和i-1相等 l和l-1相等 r和r+1相等 都会重复
    // 最左边的都大于0,剩下的更大,直接break
    // 先排序
    nums.sort((a,b)=>a-b);
    let res = [];
    for(let i=0;i<nums.length;i++){
        l = i+1;
        while(l<r){
            let sum = nums[i]+nums[l]+nums[r];
            if(sum===0){
                res.push([nums[i],nums[l],nums[r]]);
            }else if(sum>0){
                r--;
            }else if(sum<0){
                l++;
            }
        }
    }
    console.log(res);
})

/*
let path = [];
let res = [];
// 升序排序   -4 -1 -1 0 1 2
nums.sort((a,b)=>a-b);
let flag = false;
for(let i =0;i<nums.length;i++){
    if(flag){
        flag = false;
        continue;
    }
    if(nums[i]>0){
        break;
    }
    l = i+1;
    while(nums[i]+nums[l]+nums[r] < 0 && l<r){
        l++;
    }
    while(nums[i]+nums[l]+nums[r] > 0 && l<r){
        r--;
    }

    if(nums[i]+nums[l]+nums[r] == 0 && l!=r ) {
        path = [nums[i], nums[l], nums[r]];
        res.push([...path]);
    }
    // 如果i到了发现前面有相同的值，证明已用过，跳过
    if(nums[i+1]==nums[i]){
        flag = true;
    }
}
 */

