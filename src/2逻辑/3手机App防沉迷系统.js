/*
题目概述
智能手机在方便我们生活的同时，也侵占了大量时间。手机App防沉迷系统旨在帮助用户合理规划手机App使用时间，确保在正确的时间做正确的事。系统的主要功能包括：
在一天24小时内，可注册每个App的允许使用时段。
一个时段只能使用一个App，即不能同时注册多个App在同一时间段内使用。
App有优先级，数值越高，优先级越高。
注册时，如果高优先级的App时间和低优先级的时段有冲突，系统会自动注销低优先级的时段；如果App的优先级相同，则后添加的App不能注册。

编程实现
编程实现时，需要处理输入数据，包括App的数量、每个App的注册信息（名称、优先级、起始时间、结束时间），
并根据输入的时间点返回该时间点可用的App名称。如果时间点没有注册任何App，则返回“NA”。

输入
2
App1 1 09:00 10:00
App2 2 09:10 09:30
09:20
输出
App2

输入
3
app1 1 1:00 2:00
app2 2 1:00 3:00
app3 3 2:00 3:00
输出
1:30

原文链接：https://blog.csdn.net/lbp0123456/article/details/142587717
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function() {
    const n = parseInt(await readline());
    let arr = [];
    for(let i=0;i<n;i++){
        let list = (await readline()).split(" ");
        arr.push({
            id:i,
            app:list[0],
            priority:list[1],
            start:getTime(list[2]),
            end:getTime(list[3])
        })
    }
    console.log(getRes(n,arr));
}()

// 思路：
const getRes = (n,arr)=>{

}

// 将时间转化为分钟
const getTime = (x)=>{
    const [hour,minute] = x.split(":").map(Number);
    return 60*hour+minute;
}