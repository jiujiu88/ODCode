const rl = require("readline").createInterface({
    input:process.stdin
})
/*
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
示例 1：
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
*/
const lines = [];
rl.on("line",line=>{
    let nums = JSON.parse(line);
    let res = [];
    let path = [];
    // 排列是有序的，因此设置used判断是否用过
    let used = new Array(nums.length).fill(false);
    dfs(nums,used,path,res);
    console.log(res);
})

const dfs = (nums,used,path,res)=>{
//     截止条件，返回结果
    if(path.length==nums.length){
        res.push([...path]);
        return;
    }
    // 递归
    for(let i=0;i<nums.length;i++){
        if(used[i]) continue;
        // 处理分支
        path.push(nums[i]);
        used[i] = true;
        dfs(nums,used,path,res);
        path.pop();
        used[i] = false;
    }
}
