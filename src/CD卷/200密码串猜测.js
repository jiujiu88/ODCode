/*
题目描述
公安部门逮捕了一个间谍机构，在间谍机构的垃圾桶中发现了一些碎纸片，经过审问，公安判断这些碎纸片可能是某个关键密码，现在请你还原出所有可能的密码串。
注意：碎纸片上可能是一到多个字母

输入描述
输入一行序列，序列元素为碎纸片上的内容，以空格分隔

输出描述
输出一行，包含所有可能的不重复密码串，并将所有密码串字典序升序，以空格分隔

用例
输入	a b ab
输出	aabb abab abba baab baba
说明	无
原文链接：https://blog.csdn.net/qfc_128220/article/details/127711587
*/
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(" ");
    getRes(arr);
})()

// 思路: 全排列+去重 树层去重是无法检测出来的多个子串，因此用set对结果再去重
const getRes = (arr)=>{
    // console.log(n,arr);
    const n = arr.length;
    let used = Array(n).fill(false);
    let res = new Set();
    let path = [];
    // 要去重，先排序
    arr.sort();
    const dfs = (used)=>{
        if(path.length==n){
            res.add(path.join(""));
            return;
        }
        for(let i=0; i<n; i++){
            if(used[i]) continue;
            if(i>0 && arr[i]===arr[i-1] && !used[i-1]) continue;
            used[i] = true;
            path.push(arr[i]);
            dfs(used);
            used[i] = false;
            path.pop();
        }
    }
    dfs(used);
    console.log([...res].sort().join(" "));
}