const rl = require("readline").createInterface({
    input :process.stdin
})
/*
给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
你可以按 任何顺序 返回答案。
示例 1：
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
1     2    3   4
234   34   4
 */
rl.on("line",line=> {
    let [n,k] = line.split(" ").map(Number);
    let path = [];
    let res = [];
    dfs(1,n,k,path,res);
    console.log(res);
})
const dfs = (startIndex,n,k,path,res)=>{
    if(path.length==k){
        res.push([...path]);
        return;
    }
    for(let i=startIndex;i<=n;i++){
        path.push(i);
        dfs(i+1,n,k,path,res);
        path.pop();
    }
}