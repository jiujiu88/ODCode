const rl = require("readline").createInterface({
    input :process.stdin
})
/*
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
示例 1：
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */
rl.on("line",line=> {
    let nums = JSON.parse(line);
    let path = [];
    let res = [];
    dfs(nums,0,path,res);
    console.log(res);
})
const dfs = (nums,startIndex,path,res)=>{
    res.push([...path]);
    for(let i=startIndex;i<nums.length;i++){
        path.push(nums[i]);
        dfs(nums,i+1,path,res);
        path.pop();
    }
}
//减枝
//同层  排序后 i>0 && !used[i-1]   i>startIndex  然后nums[i]==nums[i-1]
//树枝  used[i]==true
//全部去重  排序后 i>0 && nums[i]==nums[i-1]
// 不排序   for循环前面定义uset 判断uset[nums[i]]存在则continue