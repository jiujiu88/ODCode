const rl = require("readline").createInterface({
    input:process.stdin
})
/*
给定参数 n，从 1 到 n 会有 n 个整数：1,2,3,…,n，这 n 个数字共有 n! 种排列。
按大小顺序升序列出所有排列的情况，并一一标记，当 n = 3 时，所有排列如下：
“123”
“132”
“213”
“231”
“312”
“321”
给定 n 和 k，返回第 k 个排列。
输入描述
输入两行：
第一行为 n，给定 n 的范围是 [1，9]
第二行为 k，给定 k 的范围是 [1，n!]
输出描述
输出排在第 k 位置的数字。
输入
3
3
输出	213
 */
const lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==2) {
        let [n, k] = lines.map(Number);
        let used = new Array(n).fill(false);
        let path = [],res = [];
        dfs(used,n,path,res);
        console.log(res[k-1].join(""))
        lines.length = 0;
    }
})

const dfs = (used,n,path,res)=>{
    if(path.length==n){
        res.push([...path]);
        return;
    }
    for(let i=1;i<=n;i++){
        if(used[i-1]) continue;
        used[i-1] = true;
        path.push(i);
        dfs(used,n,path,res);
        used[i-1] = false;
        path.pop();
    }
}