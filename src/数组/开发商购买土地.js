/*
在一个城市区域内，被划分成了n * m个连续的区块，每个区块都拥有不同的权值，代表着其土地价值。
目前，有两家开发公司，A 公司和 B 公司，希望购买这个城市区域的土地。
现在，需要将这个城市区域的所有区块分配给 A 公司和 B 公司。
然而，由于城市规划的限制，只允许将区域按横向或纵向划分成两个子区域，而且每个子区域都必须包含一个或多个区块。
为了确保公平竞争，你需要找到一种分配方式，使得 A 公司和 B 公司各自的子区域内的土地总价值之差最小。
注意：区块不可再分。
3 3
1 2 3
2 1 3
1 2 3
 */
const rl = require("readline").createInterface({
    input :process.stdin,
    output :process.stdout
})
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
/*void (async ()=>{
    let [n,m] = (await readline()).split(" ").map(Number);
    let arr = new Array(n).fill(0).map(()=>new Array(m).fill(0));
    let res = Infinity;
    // 所有数字的和
    let sum = 0;
    // 横行
    let rowSum = new Array(n);
    for(let i=0;i<n;i++){
        arr[i] = (await readline()).split(" ").map(Number);
        rowSum[i] = arr[i].reduce((a,b)=>a+b);
        sum +=rowSum[i];
    }
    // 枞列 初始值为0 可以直接相加
    let colSum = new Array(m).fill(0);
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            colSum[i] += arr[j][i];
        }
    }
    // 循环横行 如果选中当前行 其余行为sum-v 差值为sum-2*v
    for(let v of rowSum){
        res = Math.min(res,Math.abs(sum-2*v))
    }
    // 循环纵列 如果选中当前列 其余列为sum-v 差值为sum-2*v
    for(let v of colSum){
        res = Math.min(res,Math.abs(sum-2*v))
    }
    console.log(res)
})()*/

//优化
void (async ()=>{
    let [n,m] = (await readline()).split(" ").map(Number);
    let arr = new Array(n).fill(0).map(()=>new Array(m).fill(0));
    let res = Infinity;
    // 所有数字的和
    let sum = 0;
    // 横行
    let rowSum = new Array(n);
    for(let i=0;i<n;i++){
        arr[i] = (await readline()).split(" ").map(Number);
        rowSum[i] = arr[i].reduce((a,b)=>a+b);
        sum +=rowSum[i];
    }
    // 循环行
    // 切分到哪一行就加前面的所有
    let count = 0
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            count += arr[i][j];
            if(j===m-1) {
                res = Math.min(res, Math.abs(sum - 2 * count))
            }
        }
    }
    // 枞列 初始值为0 可以直接相加
    // 切分到哪一列就加前面的所有
    count = 0
    let colSum = new Array(m).fill(0);
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            count += arr[j][i];
            if(j===n-1) {
                res = Math.min(res, Math.abs(sum - 2 * count))
            }
        }
    }
    console.log(res)
})()