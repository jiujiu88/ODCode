const rl = require("readline").createInterface({
    input :process.stdin
})
/*
给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
示例 1：
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
 */
rl.on("line",line=> {
    let s = line;
    let path = [];
    let res = [];
    dfs(0,s,path,res);
    console.log(res);
})
const isReturnStr = (x)=>{
    return x == x.split("").reverse().join("");
}
const dfs = (startIndex,s,path,res)=>{
    // 截至条件，如果startIndex大于等于s的长度，则表示已经循环到最后了
    if(startIndex>=s.length) {
        res.push([...path]);
        return;
    }
    for(let i=startIndex;i<s.length;i++){
        // 获取回文字串 lastIndex到i+1的距离就是子串下标
        let sub = s.slice(startIndex,i+1);
        if(!isReturnStr(sub)) continue;
        path.push(sub);
        dfs(i+1,s,path,res);
        path.pop();
    }
}