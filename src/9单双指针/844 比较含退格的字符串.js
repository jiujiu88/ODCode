3./*
给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 true 。# 代表退格字符。
注意：如果对空文本输入退格字符，文本继续为空。
示例 1：
输入：s = "ab#c", t = "ad#c"
输出：true
解释：s 和 t 都会变成 "ac"。
示例 2：
输入：s = "ab##", t = "c#d#"
输出：true
解释：s 和 t 都会变成 ""。
示例 3：
输入：s = "a#c", t = "b"
输出：false
解释：s 会变成 "c"，但 t 仍然是 "b"。
 */
const rl = require("readline").createInterface({
    input:process.stdin
})
const lines = [];
rl.on("line",line=> {
    lines.push(line);
    if (lines.length === 2) {
        const s = lines[0];
        const t = lines[1];
        console.log(backspaceCompare(s,t));
        lines.length = 0;
    }
})
var backspaceCompare = function(s, t) {
    // 两个双指针分别指向末位字符
    let i=s.length-1;
    let j=t.length-1;
    let skipS=0;
    let skipT=0;
    // 大循环  比较s、t的相同指针位置是否值相同
    while(i>=0 || j>=0){
        // s循环 将i指到真正输出的字符下标
        while(i>=0){
            if(s[i]==="#"){
                skipS++;
                i--;
            }else if(skipS>0){
                skipS--;
                i--;
            }else{
                break;
            }
        }
        // t循环 将j指到真正输出的字符下标
        while(j>=0){
            if(t[j]==="#"){
                skipT++;
                j--;
            }else if(skipT>0){
                skipT--;
                j--;
            }else{
                break;
            }
        }
        // 相同位置的指针，相比较，如果不相同则表示输入不相同
        if(s[i]!==t[j]){
            return false;
        }
        i--;
        j--;
    }
    return true;
};