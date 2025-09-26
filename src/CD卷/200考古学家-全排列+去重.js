/*
题目描述：
考古问题，假设以前的石碑被打碎成了很多块，每块上面都有一个或若干个字符，
请你写个程序来把之前石碑上文字可能的组合全部写出来，按升序进行排列。

示例1
输入
3
a b c
输出
abc
acb
bac
bca
cab
cba

示例2
输入
3
a b a
输出
aab
aba
baa
————————————————
原文链接：https://blog.csdn.net/weixin_44038852/article/details/127469599
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const arr = (await readline()).split(" ");
    getRes(n,arr);
})()

// 思路：全排列+去重
const getRes = (n,arr)=>{
    // console.log(n,arr);
    let used = Array(n).fill(false);
    let res = [];
    let path = [];
    // 要去重，先排序
    arr.sort();
    const dfs = (used)=>{
        if(path.length==n){
            res.push(path.join(""));
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
    for(let v of res){
        console.log(v);
    }
}