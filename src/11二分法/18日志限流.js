/*
题目描述
某软件只系统会在运行过程中持续产生日志，系统每天运行N单位时间，运行期间每单位时间产生的日志条数保行在数组records中。
records[i]表示第i单位时间内产生日志条数。由于系统磁盘空间限制，每天可记录保存的日志总数上限为total条。
如果一天产生的日志总条数大于total，则需要对当天内每单位时间产生的日志条数进行限流后保存，
请计算每单位时间最大可保存日志条数limit，以确保当天保存的总日志条数不超过total。
1：对于单位时间内产生日志条数不超过limit的日志全部记录保存；
2：对于单位时间内产生日志条数超过limit的日志，则只记录保存limit条日志；
如果一天产生的日志条数总和小于等于total，则不需要启动限流机制，resut为-1。请返回result的最大值或者-1。

输入描述
第一行为系统某一天运行的单位时间数N：1<=N<=10^5
第二行为表示这一天每单位时间产生的日志数量的数组 records，0 <= records[i] <= 10^5
第三行为系统一天可以保存的总日志条数total：1 <= total <= 10^9

输出描述
每单位时间内最大可保存的日志条数limit，如果不需要启动限流机制，返回-1。

输入
6
3 3 8 7 10 15
40
输出
9

*/

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const n = parseInt(await readline());
    const records = (await readline()).split(" ").map(Number);
    const total = parseInt(await readline());
    console.log(getRes(n,records,total))
}()

// 思路:check二分  最小1，最大max(arr) 用check方法计算limit，求最大的limit
const getRes = (n,records,total)=>{
//     计算一天产生的日志总和
    let sum = records.reduce((a,b)=>a+b);
    // 如果一天产生的日志条数总和小于等于total，则不需要启动限流机制，resut为-1
    if(sum<=total) return -1;
    // 限流最小值为1，最大值为日志中最多的日志
    let left = 1,right = Math.max(...records);
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(check(mid,records,total)){
            left = mid+1;
        }else{
            right = mid-1;
        }
    }
    return left-1;
}

//  二分法计算limit，查看是否满足条件
const check = (target,records,total)=>{
    // 计算一天所有的日志
    let sum = 0;
    for(let v of records){
        sum += Math.min(v,total);
    }
    return sum<=total;
}

