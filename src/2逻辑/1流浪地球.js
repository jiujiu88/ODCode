/*
题目描述
在一座环形山上，均匀建造了 n 座信号塔，编号 0 ~ n-1。
其中有 m 座信号塔会主动在某个特定时刻变为发射状态。发射信号需要经过 1 个单位时间到达相邻信号塔。
若相邻信号塔此时是静默状态，则在接收到信号后，会被激活为发射状态。若相邻信号塔已经处于发射状态，则状态不变。
请你输出每个信号塔变为发射状态的时刻。

输入描述
第一行输入 n，表示环形山上信号塔的数量。n 不大于 10000。
第二行输入 m * 2 个整数，每两个一组，组内元素含义是：主动变为发射状态的信号塔编号 主动变为发射状态的时刻。m 不大于 n。

输出描述
按照编号顺序，依次输出每个信号塔变为发射状态的时刻，以空格分隔。

输入
3
0 1 2 3
输出
1 2 2
说明
编号0信号塔会在时刻1变为发射状态，相邻信号传输耗时1个单位时间，则编号1和2的信号塔会在时刻2接收到信号变为发射状态

原文链接：https://blog.csdn.net/qfc_128220/article/details/134375289
 */
const rl = require("readline").createInterface({
    input:process.stdin
})
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function() {
    const n = parseInt(await readline());
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(n,arr));
}()

// 思路：双循环 每次循环获取当前节点i到j的距离，距离分为内环和外环，取最小的，i的发射时间+距离作为j的发射时间。每个节点j的发射时间也取最小的
const getRes = (n,arr)=>{
    // 初始化发射时间，由于要取最小的，初始化为最大的
    const res = Array(n).fill(Infinity);
    // 先初始化信号塔的发射时间
    for(let i=0;i<n;i+=2){
        const no = arr[i];
        const time = arr[i+1];
        res[no] = time;
    }
    // 遍历 查找i到j的距离,取最小发射时间
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            let inSide = Math.abs(j-i);
            let outSide = n-inSide;
            let distance = Math.min(inSide,outSide);
            res[j] = Math.min(res[j],res[i]+distance);
        }
    }
    return res.join(" ");
}