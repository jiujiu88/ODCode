/*
题目描述
现有N个任务需要处理，同一时间只能处理一个任务，处理每个任务所需要的时间固定为1。
每个任务都有最晚处理时间限制和积分值，在最晚处理时间点之前处理完成任务才可获得对应的积分奖励。
可用于处理任务的时间有限，请问在有限的时间内，可获得的最多积分。

输入描述
第一行为一个数 N，表示有 N 个任务

1 ≤ N ≤ 100
第二行为一个数 T，表示可用于处理任务的时间

1 ≤ T ≤ 100
接下来 N 行，每行两个空格分隔的整数（SLA 和 V），SLA 表示任务的最晚处理时间，V 表示任务对应的积分。
1 ≤ SLA ≤ 100
0 ≤ V ≤ 100000

输出描述
可获得的最多积分
用例1
输入
4
3
1 2
1 3
1 4
1 5
输出
5
说明
虽然有3个单位的时间用于处理任务，可是所有任务在时刻1之后都无效。
所以在第1个时间单位内，选择处理有5个积分的任务。1-3时无任务处理。

用例2
输入
4
3
1 2
1 3
1 4
3 5
输出
9
说明
第1个时间单位内，处理任务3，获得4个积分
第2个时间单位内，处理任务4，获得5个积分
第3个时间单位内，无任务可处理
共获得9个积分
原文链接：https://blog.csdn.net/banxia_frontend/article/details/147314833
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const t = parseInt(await readline());
    let list = [];
    for(let i=0;i<n;i++){
        list.push((await readline()).split(" ").map(Number))
    }
    console.log(getRes(n,t,list));
})()

// 思路：贪心
const getRes = (n,t,list)=>{
    console.log(n,t,list);
    // SLA 表示任务的最晚处理时间，V 表示任务对应的积分
    // 按最晚时间从小到大排，先处理紧急的
    list.sort((a,b)=>a[0]-b[0]);
    // 已经花费的处理时间
    let days = 0;
    // 获得的积分
    let score = 0;
    // 有序数组  因为每个任务都是1分，因为直接按
    let queue = [];
    for(let [SLA,V] of list){
        if(days+1<=SLA){
            queue.push(V);
            score += V;
            days++;
        }else{
        //     数组要保持有序，进行升序排序
            queue.sort((a,b)=>a-b);
            const min = queue[0];
            if(queue.length && V>min){
                queue.shift();
                queue.push(V);
                score += V - min;
            }
        }
    }
    queue.sort((a,b)=>a-b);
    while(queue.length>t){
        score -=queue.shift();
    }
    return score;
}