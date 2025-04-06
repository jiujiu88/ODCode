/*
题目描述
同一个数轴X上有两个点的集合A={A1, A2, …, Am}和B={B1, B2, …, Bn}，Ai和Bj均为正整数，A、B已经按照从小到大排好序，

A、B均不为空，给定一个距离R(正整数)，列出同时满足如下条件的所有（Ai, Bj）数对：

Ai <= Bj
Ai, Bj之间的距离小于等于R
在满足1,2的情况下,每个Ai只需输出距离最近的Bj
输出结果按Ai从小到大的顺序排序
输入描述
第一行三个正整数m,n,R

第二行m个正整数,表示集合A

第三行n个正整数,表示集合B

输入限制：

1<=R<=100000, 1<=n,m<=100000, 1<=Ai,Bj<=1000000000

输出描述
每组数对输出一行Ai和Bj,以空格隔开

用例1
输入
4 5 5
1 5 5 10
1 3 8 8 20
输出
1 1
5 8
5 8
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [m,n,r] = (await readline()).split(" ").map(Number);
    const a = (await readline()).split(" ").map(Number);
    const b = (await readline()).split(" ").map(Number);
    let res = getRes(m,n,r,a,b);
    // 将res循环打印出来
    for(let v of res){
        console.log(v);
    }
})()

// 思路：双指针，循环a的指针，如果b[j]>a[i],j++,当满足条件时记录结果
const getRes = (m,n,r,a,b)=>{
    let res = [];
    let i=0,j=0;
    while(i<a.length && j<b.length){
        // 找到bj
        while(a[i]>b[j]){
            j++;
        }
        if(b[j]-a[i]<=r){
            res.push(a[i]+" "+b[j]);
        }
        i++;
    }
    return res;
}