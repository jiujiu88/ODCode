/*
题目描述
公司创新实验室正在研究如何最小化资源成本，最大化资源利用率，请你设计算法帮他们解决一个任务分布问题:
有taskNum项任务，每人任务有开始时间(startTime) ，结更时间(endTme) 并行度(paralelism) 三个属性，
并行度是指这个任务运行时将会占用的服务器数量，一个服务器在每个时刻可以被任意任务使用但最多被一个任务占用，任务运行完成立即释放(结束时刻不占用)。
任务分布问题是指给定一批任务，让这批任务由同一批服务器承载运行，请你计算完成这批任务分布最少需要多少服务器，从而最大最大化控制资源成本。

输入描述
第一行输入为taskNum，表示有taskNum项任务 接下来taskNum行，每行三个整数，
表示每个任务的开始时间(startTime ) ，结束时间 (endTime ) ，并行度 (parallelism)。

输出描述
一个整数，表示最少需要的服务器数量。

测试用例1
输入
3
2 3 1
6 9 2
0 5 1
输出
2
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const n = parseInt(await readline());
    let arr = [];
    for(let i=0;i<n;i++){
        arr.push((await readline()).split(" ").map(Number));
    }
    console.log(getRes(n,arr));
})();

const getRes = (n,arr)=>{
// 差分数组
    let max = 0;
    for(let [s,e] of arr){
        max = Math.max(max,e);
    }
    const diff = Array(max+2).fill(0);
    for(let [s,e,cnt] of arr){
        diff[s] += cnt;
        // 由于结束时刻不占用，因此不是e+1.例如6 9 2，6/7/8都占用2，9时不占用
        diff[e] -= cnt;
    }
    console.log(diff)
    // [1, 0, 1, -1,  0, -1, 2, 0,  0, -2, 0]
    let cur = 0,res = 0;
    // 取差分的前缀和，表示当i时刻，需要的服务器台数，这样直接取前缀和的最大值就是结果
    for(let v of diff){
        cur +=v;
        res = Math.max(res,cur);
        console.log(cur);
    }
    // 前缀和 1 1 2 1 1 0 2 2 2 0 0
    return res;
}