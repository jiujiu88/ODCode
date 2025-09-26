/*
题目
有两位玩家：一个出谜，一个猜谜。
出谜者设定一个4位数作为谜底，而猜谜者则要猜这个四位数是什么。每次猜完后，出谜者会给予提示，直到猜谜者猜中这个数字。
提示的格式是XAYB：
X表示猜浜者猜中的数字的数量，并且位置也正确。
Y表示数字被猜中了，但位置猜错了。
例如：
谜底是8123，猜浜者猜1052。那么提示就是0A2B。
谜底是5637，猜浜者猜4931。那么提示就是1A0B。
已知你有N组猜浜者的猜测和出谜者的提示，如果你能确定谜底是什么，输出谜底。如果不能确定，就输出"NA"。

输入格式：
第一行是一个正整数N (0＜N＜100)。
接下来的N行，每行包括一个猜浜者的猜测和出谜者的提示。

输出格式：
如果谜底可以确定，输出这个四位数。如果不能确定，输出"NA"。

示例：
输入：
6
4815 1A1B
5716 0A1B
7842 0A1B
4901 0A0B
8585 3A0B
8555 2A1B
输出：
3585

输入
6
6531 0A2B
7994 0A2B
2511 0A1B
9108 1A0B
8777 1A0B
3511 0A2B
输出
NA
说明
4173、9753、9375、9357都符合，不存在在唯一解，返回NA

原文链接：https://blog.csdn.net/wtswts1232/article/details/132487496
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const arr = [];
    for(let i=0;i<n;i++){
        arr.push((await readline()).split(" "))
    }
    console.log(getRes(n,arr));
})()

// 思路：
const getRes = (n,arr)=>{
    console.log(n,arr);

}