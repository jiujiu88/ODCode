/*
题目描述
阿里巴巴是一个贫穷的樵夫，他在去砍柴的路上意外发现了强盗集团的藏宝地。这个藏宝地由编号从0到N的箱子组成，每个箱子上都有一个数字。
这些箱子排列成一个环，其中编号最大的箱子的下一个是编号为0的箱子。请输出每个箱子上贴的数字之后的第一个比它大的数字，如果不存在则输出-1。

输入描述：
输入一个数字串，数字之间使用逗号分隔，例如：1,2,3,1。
1 ≤ 数字串中的数字个数 ≤ 10000。
-100000 ≤ 每个数字的值 ≤ 100000。

输出描述：
输出一个数字串，表示每个箱子上的数字之后的第一个比它大的数字

示例1：
输入
2,5,2
输出
5,-1,5
说明：
第一个2的下一个更大的数字是5。
数字5找不到下一个更大的数字。
第二个2的下一个更大的数字需要循环搜索，结果也是5。

示例2：
输入
3,4,5,6,3
输出
4,5,6,-1,4

原文链接：https://blog.csdn.net/wtswts1232/article/details/131596386
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const list = (await readline()).split(",").map(Number);
    console.log(getRes(list));
})();

// 思路：参考503 下一个更大的元素II
const getRes = (list)=>{
    console.log(list);
    const n = list.length;
    let stack = [];
    let res = Array(n).fill(-1);
    for(let i=0;i<2*n;i++){
        let idx = i%n;
        while(stack.length && list[stack[stack.length-1]]<list[idx]){
            res[stack.pop()] = list[idx];
        }
        if(i<n){
            stack.push(i);
        }
    }
    return res.join(",");
}