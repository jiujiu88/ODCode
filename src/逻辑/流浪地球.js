const rl = require("readline").createInterface({
    input:process.stdin
})
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
// 0 1 2 3 4 5 6 7
void async function(){
    const [n,e] = (await readline()).split(" ").map(Number);
    let machines = new Array(n).fill(n+1);
    for(let i=0;i<e;i++){
        const r = (await readline()).split(" ").map(Number);
        // 记录发动机启动的时刻
        machines[r[1]] = r[0];
    }
    // 0 1 2 3 4 5 6 7
    // 循环，机器i启动时间
    for(let i=0;i<n;i++){
        // 关联机器j
        for(let j=0;j<n;j++){
            // 机器i和机器j的直线距离
            let dis = Math.abs(i-j);
            // 环形另一边的距离
            let circleDis = n-dis;
            // 获取最短距离，相当于时间
            let minDis = Math.min(dis,circleDis);
            machines[j] = Math.min(machines[j],machines[i]+minDis)
        }
    }
    let map = new Map();
    // 拼成map，排序
    for(let i=0;i<machines.length;i++){
        let time = machines[i];
        map.set(time,(map.has(time)?[...map.get(time),i]:[i]));
    }
    // 降序排列
    let arr = Array.from(map).sort((a,b)=>b[0]-a[0])
    // console.log(machines,arr)
    console.log(arr[0][0])
    console.log(arr[0][1].join(" "))

}()

// 0 1 2 3 4 5 6 7
