/*
题意
在一棵树中，每个节点代表一个家庭成员，节点的数字表示其个人的财富值，一个节点及其直接相连的子节点被定义为一个小家庭。
现给你一棵树，请计算出最富裕的小家庭的财富和。

输入
第一行为一个数N，表示成员总数，成员编号1-N,1<=N<=1000
第二行为N个空格分隔的数，表示编号1-N的成员的财富值。0<=财富值<=1000000
接下来N-1行，每行两个空格分隔的整数(N1N2)，表示N1是N2的父节点。

输出
最富裕的小家庭的财富和

示例
输入
4
100 200 300 500
1 2
1 3
2 4
输出	700
说明
成员1，2，3组成的小家庭财富值为600
成员2，4组成的小家庭财富值为700

原文链接：https://blog.csdn.net/qq_52994629/article/details/134490058
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    // 计数从1开始，财富数组从1开始，0成员的财富为0
    const list = [0,...(await readline()).split(" ").map(Number)];
    let relationship = [];
    for(let i=0;i<n-1;i++){
        relationship.push((await readline()).split(" ").map(Number));
    }
    console.log(getRes(n,list,relationship));
})()

// 思路：深拷贝数组family，循环关系列表，往family中累加孩子的财富值，返回最大值
const getRes = (n,list,relationship)=>{
    // console.log(n,list,relationship)
    // 新增数组，用来放置一个家庭的财富
    let family = [...list];
    for(let [fa,ch] of relationship){
        family[fa] += list[ch];
    }
    return Math.max(...family);
}