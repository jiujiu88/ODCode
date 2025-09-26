/*
题目描述
在学校中，N个小朋友站成一队，第i个小朋友的身高为height[i]，第i个小朋友可以看到的第一个比自己身高更高的小朋友j，那么是的好朋友(要求j>i)。
请重新生成一个列表，对应位置的输出是每个小朋友的好朋友位置，如果没有看到好朋友，请在该位置用0代替。
小朋友人数范围是[0,40000]

输入描述
第一行输入N，N表示有N个小朋友
第二行输入N个小朋友的身高height[i]，都是整数

输出描述
输出N个小朋友的好朋友的位置。
N个小朋友站成一队，第i个小朋友的身高为height[i]，第i个小朋友可以看到的第一个比自己身高更高的小朋友j，那么是的好朋友(要求j>i)。

输入：
8
123 124 125 121 119 122 126 123
输出：
1 2 6 5 5 6 0 0
说明
123的好朋友

原文链接：https://blog.csdn.net/guorui_java/article/details/134574398
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(n,arr));
})()

// 就是找离i的下一个更大的元素，用单调栈
const getRes = (n,arr)=>{
    let stack = [];
    let res = Array(n).fill(0);
    for(let i=0;i<n;i++){
        // 如果栈顶的同学比当前同学矮，则当前同学就是他的朋友
        while(stack.length && arr[stack[stack.length-1]]<arr[i]){
            res[stack.pop()] = i;
        }
        stack.push(i);
    }
    return res.join(" ");
}