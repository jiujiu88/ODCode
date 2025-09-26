/*
题目描述


输入
4 2
0 -1 -1 -1
1 0 1 -1
-1 -1 0 1
-1 -1 -1 0
输出
2
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const [n,x] = (await readline()).split(" ").map(Number);
    const grid = Array.from({length:n},()=>Array(n));
    for(let i=0;i<n;i++){
        // !!注意：要将-1转化为最大值，因为要取最小路径
        grid[i] = (await readline()).replace(/-1/g,Infinity).split(" ").map(Number);
    }
    console.log(getRes(n,x,grid));
}()

// 思路: 单源最短路径
const getRes = (n,x,grid)=>{
    const dist = Array(n).fill(Infinity);
    const used = Array(n).fill(false);
    // 设置起点
    dist[x-1] = 0;
    for(let g=0;g<n;g++){
        let x = -1;
    //     先找到最近的下标
        for(let i=0;i<n;i++){
            // 没遍历过，为初始值或找到更近的路径
            if(!used[i] && (x==-1 || dist[i]<dist[x])){
                x = i;
            }
        }
    //     标记使用过
        used[x] = true;
    //     计算最短路径
        for(let i=0;i<n;i++){
            dist[i] = Math.min(dist[i],dist[x]+grid[x][i]);
        }
    }
    let res = Math.max(...dist);
    // // 如果res最大的值是无穷，表示无法到达
    return res==Infinity ? -1 : res;
}

// console.log(getRes([[2,1,1],[2,3,1],[3,4,1]], 4, 2))