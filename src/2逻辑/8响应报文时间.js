/*
题目描述
在IGMP协议中，有一个字段称作最大响应时间（max response time）。当host（主机）收到查询报文后，会解析出max response time字段，
并需要在（0，max response time]时间（秒）内选取随机时间回应一个响应报文。
如果在随机时间内收到一个新的查询报文，则会根据两者时间的大小，选取小的一方来刷新回应时间。
最大响应时间有如下计算方式：
当max resp code < 128时，max resp time = max resp code；
当max resp code ≥ 128时，需要使用特定的计算公式来得出max resp time，该公式涉及将max resp code拆分为高位的exp和低位的mant，
然后进行位移和或运算：（mant | 0x10）<<（exp + 3）。
现在给出host收到查询报文个数c，以及每次收到查询报文的时间t和对应的最大响应时间字段值m，要求计算出host发送响应报文的时间。

输入描述
第一行为查询报文个数c；
后续每行分别为host收到报文时间t（以秒为单位）及最大响应时间m，两者以空格分隔。

输出描述
根据输入信息，计算出host发送响应报文的时间，并按照从小到大的顺序输出。

输入
3
0 10
5 130
10 64
输出
10
298
362

原文链接：https://blog.csdn.net/lbp0123456/article/details/143243445
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void (async ()=> {
    const n = parseInt(await readline());
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push((await readline()).split(" ").map(Number));
    }
    console.log(getRes(n, arr));
})()

// 思路：
const getRes = (n, arr)=>{

}


