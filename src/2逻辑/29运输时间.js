/*
题目描述
M辆车需要在一条不能超车的单行道到达终点，起点到终点的距离为N。
速度快的车追上前车后，只能以前车的速度继续行驶，求最后一辆到达目的地的车的花费时间。
注意：
每辆车固定间隔1小时出发，比如第一辆车0时出发，第二辆车1时出发，以此类推。

输入描述
第一行输入两个数字M、N，分别表示M辆车和跑道的距离N。
接下来的M行表示每辆车的行驶速度。

输出描述
最后一辆车到达目的地花费的时间。

输入
2 11
3
2
输出
5.5
说明

原文链接：https://blog.csdn.net/guorui_java/article/details/136492739
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [m,n] = (await readline()).split(" ").map(Number);
    const arr = [];
    for (let i = 0; i < m; i++) {
        arr.push(parseInt(await readline()));
    }
    console.log(getRes(m,n,arr));
})()

// 思路：
const getRes = (m,n,arr)=>{

}