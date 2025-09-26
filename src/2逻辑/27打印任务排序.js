/*
题目描述
某个打印机根据打印队列执行打印任务。打印任务分为九个优先级，分别用数字1-9表示，数字越大优先级越高。
打印机每次从队列头部取出第一个任务A，然后检查队列余下任务中有没有比A优先级更高的任务，如果有比A优先级高的任务，
则将任务A放到队列尾部，否则就执行任务A的打印。请编写一个程序，根据输入的打印队列，输出实际的打印顺序。

输入描述
输入一行，为每个任务的优先级，优先级之间用逗号隔开，优先级取值范围是1~9。

输出描述
输出一行，为每个任务的打印顺序，打印顺序从0开始，用逗号隔开

示例1
输入
9,3,5
输出
0,2,1

示例2
输入
1,2,2
输出
2,0,1

原文链接：https://blog.csdn.net/qq_40642440/article/details/128034560
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(",");
    console.log(getRes(arr));
})()

// 思路：
const getRes = (arr)=>{
    console.log(arr);

}