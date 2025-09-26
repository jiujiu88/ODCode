/*
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
你可以按任意顺序返回答案。
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
 */
const rl = require("readline").createInterface({
    input : process.stdin
})
const lines = [];
rl.on("line",line=>{
    lines.push(line);
    const nums = JSON.parse(lines[0]);
    const target = parseInt(lines[1]);
    const map = new Map();
    // 哈希算法  用map的属性
    for(let i=0;i<nums.length;i++){
        // 当前数为nums[i],要找的数为target-nums[i];
        if(map.has(target-nums[i])){
            console.log([i,map.get(target-nums[i])]);
            break;
        }
        map.set(nums[i],i);
    }
    lines.length = 0;
})