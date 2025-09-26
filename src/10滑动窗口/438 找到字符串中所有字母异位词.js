/*
给定两个字符串 s 和 p，找到 s 中所有 p 的异位词的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
示例 1:
输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
示例 2:
输入: s = "abab", p = "ab"
输出: [0,1,2]
解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length===2){
        let [s,p] = lines;
        const arr = new Array(26).fill(0);
        let a = "a".charCodeAt();
        let n = p.length;
        let res = [];
        for(let i=0;i<p.length;i++){
            arr[p[i].charCodeAt()-a]++;
        }
        let left = 0;
        for(let i=0;i<s.length;i++){
            let x = s[i].charCodeAt()-a;
            arr[x]--;
            // 如果有不符合的出现，则右移
            while(arr[x]<0){
                let l = s[left].charCodeAt()-a;
                arr[l]++;
                left++;
            }
            // 记录结果 如果left和right的长度等于p的长度，则找到了
            if(i-left+1===n){
                res.push(left);
            }
        }
        console.log(res)
    }

})