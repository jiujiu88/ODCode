/*
题目描述
为了充分发挥GPU算力，需要尽可能多的将任务交给GPU执行，现在有一个任务数组，数组元素表示在这1秒内新增的任务个数且每秒都有新增任务。
假设GPU最多一次执行n个任务，一次执行耗时1秒，在保证GPU不空闲情况下，最少需要多长时间执行完成。

输入描述
第一个参数为GPU一次最多执行的任务个数，取值范围[1, 10000]
第二个参数为任务数组长度，取值范围[1, 10000]
第三个参数为任务数组，数字范围[1, 10000]
输出描述
执行完所有任务最少需要多少秒。
用例
输入
3
5
1 2 3 4 5
输出	6
原文链接：https://blog.csdn.net/m0_46181452/article/details/132112081
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const t = parseInt(await readline());
    const n = parseInt(await readline());
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(t,n,arr));
})()

// 思路：数组是每一秒多一些任务，然后CPU同时执行任务，当满载运行时，任务还是执行不完，就遗留到下一次执行
const getRes = (t,n,arr)=>{
    // console.log(t,n,arr);
    let res = n;
    // 计算剩余任务
    let remain = 0;
    for(let v of arr){
        // 每一轮 需要处理的任务：remain+v,如果大于CPU最大处理个数，则剩下来。持续维护待处理的任务
        remain = remain + v >t ? remain+v-t : 0;
    }
    // 所有任务按序执行后，如果还有剩余的没执行（由于CPU限制），剩下的继续满载执行，向上取整
    res +=Math.ceil(remain/t);
    return res;
}