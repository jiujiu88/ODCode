/*
题目描述
在一个狭小的路口，每秒只能通过一辆车，假设车辆的颜色只有 3 种，找出 N 秒内经过的最多颜色的车辆数量。

三种颜色编号为0 ，1 ，2

输入描述
第一行输入的是通过的车辆颜色信息

[0,1,1,2] 代表4 秒钟通过的车辆颜色分别是 0 , 1 , 1 , 2

第二行输入的是统计时间窗，整型，单位为秒

输出描述
输出指定时间窗内经过的最多颜色的车辆数量。

用例1
输入
0 1 2 1
3
输出
2
说明
在 3 秒时间窗内，每个颜色最多出现 2 次。例如：[1,2,1]

用例2
输入
0 1 2 1
2
输出
1
说明
在 2 秒时间窗内，每个颜色最多出现1 次。
输入
4 7 8 4 5 0 2 8 0 8 3 8 5 6 4 5 8 5 5 8 6 0 3 5 5 0 5 5 4 5 3 0 6 1 3 8 5 2 3 7 1 3 6 6 5 7 4 7 3 7 3 2 5 6 5 6 0 6 4 6 6 7 3 2 5 3 1 1 4 2 2 8 3 2 6 6 4 6 4 8 2 3 3 3 5 6 5 4 4 7 0 8 3 2 3 4 1 6 4 6
11
输出6
输入
8 2 3 1 4 1 5 0 8 8 8 7 6 5 5 1 8 5 0 7 4 6 4 0 7 8 2 3 2 1 7 6 1 8 2 5 2 3 0 5 6 6 2 2 4 7 7 8 1 0 3 3 6 4 0 6 1 3 0 3 0 1 3 2 7 7 2 4 3 1 3 3 1 5 6 1 3 2 1 2 1 0 7 7 0 6 0 6 7 4 6 6 5 6 4 6 3 7 7 2
125
输出14
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：滑窗记录在长度为k内，出现不同车出现的最多次数--车辆不止3种，更新时需要获取当前入的值的最多次数（可以在continue前比较）
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(" ").map(Number);
    const k = parseInt(await readline());
    console.log(getRes(arr,k));
})()

// 实际车辆不止3种
const getRes = (arr,k)=>{
    let res = 0;
    let map = {};
    let left = 0;
    for(let i=0;i<arr.length;i++){
        // 人
        map[arr[i]] ? map[arr[i]]++ : map[arr[i]]=1;
        // 更新 ！！！res变化就是因为当前值的影响，直接比较res和当前值出现次数
        res = Math.max(res,map[arr[i]]);
        if(i+1>k){
            continue;
        }
        // 窗口缩小时，出
        map[arr[i+1-k]]--;
        // if(i+1-left>k){
        //     map[arr[left++]]--;
        // }
        // 记录结果--就是arr[i]影响了结果，直接比较arr[i]和最大值即可
        // res = Math.max(res,map[arr[i]]);
    }
    return res;
}