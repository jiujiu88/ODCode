/*
题目描述
输入一个字符串仅包含大小写字母和数字，求字符串中包含的最长的非严格递增连续数字序列的长度，（比如12234属于非严格递增连续数字序列）。

输入描述
输入一个字符串仅包含大小写字母和数字，输入的字符串最大不超过255个字符。

输出描述
最长的非严格递增连续数字序列的长度

用例1
输入
abc2234019A334bc
输出
4
说明
2234为最长的非严格递增连续数字序列，所以长度为4。
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const s = await readline();
    console.log(getRes(s));
})()

// 思路：双指针，分组循环的模板
const getRes = (s)=>{
    let res = 0;
    let set = new Set("0123456789");
    let i=0;
    while(i<s.length){
        if(!set.has(s[i])){
            i++;
            continue;
        }
        // 设置连续子序列开始索引为start
        let start = i;
        i++;
        // 如果是数字，且递增的，则i++
        while(set.has(s[i]) && s[i]>=s[i-1]){
            i++;
        }
        // start到i是一组，下一组从i开始
        res = Math.max(res,i-start);
    }
    return res;
}