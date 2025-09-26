/*
给定 M（0 < M ≤ 30）个字符（a-z），从中取出任意字符（每个字符只能用一次）拼接成长度为 N（0 < N ≤ 5）的字符串，
要求相同的字符不能相邻，计算出给定的字符列表能拼接出多少种满足条件的字符串，
输入非法或者无法拼接出满足条件的字符串则返回0。
输入描述
给定的字符列表和结果字符串长度，中间使用空格(" ")拼接
输出描述
满足条件的字符串个数
输入	abc 1
输出	3
说明	给定的字符为a,b,c，结果字符串长度为1，可以拼接成a,b,c，共3种
输入	dde 2
输出	2
说明	给定的字符为dde，结果字符串长度为2，可以拼接成de,ed，共2种
 */
// abcd
//
// ab ac ad  ba bc bd  ca cb cd  da  db dc
//全排列  去重
const rl = require("readline").createInterface({
    input:process.stdin
})
rl.on("line",line=>{
    let [s,n] = [line.split(" ")[0],parseInt(line.split(" ")[1])];
    let count = 0;
    let used = new Array(s.length).fill(false);
    // used用来记录用了哪些字符 index记录层数
    // 字典排序
    s = [...s].sort();
    const backtracking = (index,pre,used)=>{
        if(index==n){
            count++;
            return;
        }
        for(let i=0;i<s.length;i++){
            // 去重
            // if(i>0 && s[i]==s[i-1]) continue;
            // 树层去重 used[i-1]为false表示树层重复（回溯恢复）
            if(!used[i-1] && i>0 && s[i]==s[i-1]) continue;
            // 选择的上一个数去重
            if(pre>=0 && s[i]==s[pre]) continue;
            // 或者 used[pre]为true表示树枝重复（到下一层树枝）
            // if(used[pre] && s[i]==s[pre]) continue;
            if(used[i]) continue;
            used[i] = true;
            backtracking(index+1,i,used);
            used[i] = false;
        }
    }
    backtracking(0,used);
    console.log(count);
})
