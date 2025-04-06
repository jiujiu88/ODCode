/*
题目描述
开头和结尾都是元音字母（aeiouAEIOU）的字符串为元音字符串，其中混杂的非元音字母数量为其瑕疵度。比如:

“a” 、 “aa”是元音字符串，其瑕疵度都为0
“aiur”不是元音字符串（结尾不是元音字符）
“abira”是元音字符串，其瑕疵度为2
给定一个字符串，请找出指定瑕疵度的最长元音字符子串，并输出其长度，如果找不到满足条件的元音字符子串，输出0。

子串：字符串中任意个连续的字符组成的子序列称为该字符串的子串。

输入描述
首行输入是一个整数，表示预期的瑕疵度flaw，取值范围[0, 65535]。

接下来一行是一个仅由字符a-z和A-Z组成的字符串，字符串长度(0, 65535]。

输出描述
输出为一个整数，代表满足条件的元音字符子串的长度。

用例1
输入
0
asdbuiodevauufgh
输出
3
用例2
输入
2
aeueo
输出
0

输入1
aAoObBbiI
输出0

输入6
qGbIFtQBGjAE
输出 9
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const flaw = parseInt(await readline());
    const s = await readline();
    console.log(getRes(flaw,s));
})()

// 思路：参考滑窗2831  记录字符串中所有元音字符的下标，用滑窗计算，left和right下标中瑕疵度为idxs[right]-idxs[left]-(right-left)
const getRes = (flaw,s)=>{
    // 用set记录元音字符，可用set.has快速判断
    let set = new Set("aeiouAEIOU");
    let res = 0;
    let idxs = [];
    for(let i=0;i<s.length;i++){
        if(set.has(s[i])){
            idxs.push(i);
        }
    }
//     滑窗找到指定瑕疵度的最长元音字符子串
    let left = 0;
    for(let right=0;right<idxs.length;right++){
        let err = idxs[right]-idxs[left]-(right-left);
        // 如果瑕疵度大于指定值，缩小窗口减少瑕疵度
        while(err>flaw){
            left++;
            err = idxs[right]-idxs[left]-(right-left);
        }
        // 如果瑕疵度等于指定值，更新结果，记录子串的长度
        if(err===flaw){
            res = Math.max(res,idxs[right]-idxs[left]+1);
        }
    }
    return res;
}
