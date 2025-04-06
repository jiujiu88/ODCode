/*
给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度。
示例 1:
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
rl.on("line",line=>{
    const s = line;
    console.log(lengthOfLongestSubstring(s))
})

// 方法一 优先用set 只需要知道是否有字符重复即可，用set.has可以快速判断
var lengthOfLongestSubstring = function(s) {
    let set = new Set();
    let left=0;
    let right = 0;
    let res = 0;
    while(right<s.length){
        // 如果碰到重复的字符,移除
        while(set.has(s[right])){
            set.delete(s[left]);
            left++;
        }
        // 加入该元素
        set.add(s[right]);
        res = Math.max(res,right-left+1);
        right++;
    }
    return res;
};

// 方法二 用map 比较麻烦，因为只用判断是否有这个字符即可，不需要比较个数多少。
var lengthOfLongestSubstring1 = function(s) {
    let left = 0,right = 0;
    let map = new Map();
    let res = 0;
    while(left<=right && right<s.length){
        map.set(s[right],(map.get(s[right])||0)+1);
        while(map.get(s[right])>1){
            map.set(s[left],(map.get(s[left])||0)-1);
            left++;
        }
        res = Math.max(res,right-left+1);
        right++;
    }
    return res;
};