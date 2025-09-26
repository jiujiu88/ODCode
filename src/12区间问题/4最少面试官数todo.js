/*
题目描述
某公司组织一场公开招聘活动，假设由于人数和场地的限制，每人每次面试的时长不等， 并已经安排给定，
用(S1,E1)、(S2,E2)(Sj,Ej)…(Si< Ei，均为非负整数)表示每场面试的开始和结束时间。
面试采用一对一的方式，即一名面试官同时只能面试一名应试者，一名面试官完成一次面试后可以立即进行下一场面试，
且每个面试官的面试人次不超过m。 为了支撑招聘活动高效顺利进行，请你计算至少需要多少名面试官。

输入描述
输入的第一行为面试官的最多面试人次 m，第二行为当天总的面试场次 n
接下来的 n 行为每场面试的起始时间和结束时间，起始时间和结束时间用空格分隔.
其中，1 <= n,m <= 500

输出描述
输出一个整数，表示至少需要的面试官数量。

测试用例1
输入
2 4
8 10
11 13
10 12
12 13
输出
3
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const [m,n] = (await readline()).split(" ").map(Number);
    const list = [];
    for(let i=0;i<n;i++){
        list.push((await readline()).split(" ").map(Number));
    }
    console.log(getRes(m,n,list));
})();

const getRes = (m,n,list)=>{
//     右端点排序
    list.sort((a,b)=>a[1]-b[1]);
    console.log(list);
//     合并区间 ，合并个数最多为m
    let count = 0;
    let res = 0;
    let right = 0;
    for(let i=0;i<n;i++){
        // 如果前一个区间的右端点，小于等于下一个区间的左端点，表示可以连着面试
        if(right<=list[i][0]){
            count++;
            right = list[i][1];
        }

    }
}