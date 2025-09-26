/*
题目描述
有一辆汽车需要从m * n的地图的左上角（起点）开往地图的右下角（终点），去往每一个地区都需要消耗一定的油量，加油站可进行加油。

请你计算汽车确保从起点到达终点时所需的最少初始油量。

地图说明
智能汽车可以上下左右四个方向移动。
地图上的数字取值是0、-1或正整数：
-1：表示加油站，可以加满油，汽车的油箱容量最大为100。
0：表示这个地区是障碍物，汽车不能通过。
正整数：表示汽车走过这个地区的耗油量。
如果汽车无论如何都无法到达终点，则返回-1。

输入描述
第一行为两个数字M、N，表示地图的大小为M * N（0 < M, N ≤ 200）。后面一个M * N的矩阵，其中的值是0、-1或正整数，加油站的总数不超过200个。

输出描述
如果汽车无论如何都无法到达终点，则返回-1；如果汽车可以到达终点，则返回最少的初始油量。

示例1：
输入：
2,2
10,20
30,40
输出：
70

示例2：
输入：
4,4
10,30,30,20
30,30,-1,10
0,20,20,40
10,-1,30,40
输出：
70
说明:右-右-下（补油）-下-下-右  如果开始为0，补油后为30，最后需要加90，是不是初始只有60？这样不对，因为开到加油站至少要70才行。
原文链接：https://blog.csdn.net/lbp0123456/article/details/144063438
 */
// 思路：用二分法取到初始油量，check判断是否符合要求。一旦remain的油量为负数，则不符合
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const [m,n] = (await readline()).split(",").map(Number);
    const grid = [];
    for(let i=0;i<m;i++){
        grid.push((await readline()).split(",").map(Number));
    }
    console.log(getRes(m,n,grid));
})()

// 思路：二分+层序遍历  数据较多，用dfs容易超时  每层记录下标和剩余的油量即可。油量不够则continue,遇到-1则重置为100.
function getRes(m,n,grid) {
    console.log(m,n,grid)
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    // 计算初始油量为start时，是否可以走到终点
    const check = (start)=>{
        // 每次都要重置visit,否则check前面的visit有的值已经被用了
        const visit = Array.from({length:m},()=>Array(n).fill(false));
        console.log("------------开始检查---------------"+start)
        let queue = [[0,0,start-grid[0][0]]];
        visit[0][0] = true;
        // console.log("初始油量",start,"当前用油",grid[0][0],"剩余",start-grid[0][0])
        while(queue.length){
            let size = queue.length;
            for(let x=0;x<size;x++){
                let [i,j,remain] = queue.shift();
                for(let [x,y] of directs){
                    const newI = i+x,newJ = j+y;
                    // console.log("上下左右：",newI,newJ);
                    // 不越界，没遍历过，且不是障碍物
                    if(isInArea(newI,newJ) && !visit[newI][newJ] && grid[newI][newJ]!=0){
                        // 一定要用新变量记录剩余油量,不可直接修改,否则同层级的后面遍历的可能导致remain改变.
                        let newRemain = 0;
                        // 如果碰到加油站了，直接装满油
                        if(grid[newI][newJ]==-1){
                            newRemain = 100;
                        }else {
                            if (remain - grid[newI][newJ] < 0) {
                                console.log("不够了，此路不通",newI,newJ)
                                continue;
                            }
                            newRemain = remain - grid[newI][newJ];
                        }
                        // 可以走到终点，返回true
                        if(newI==m-1 && newJ==n-1){
                            console.log("走到终点")
                            return true;
                        }
                        visit[newI][newJ] = true;
                        console.log("加入下一层",newI,newJ,newRemain);
                        queue.push([newI,newJ,newRemain]);
                    }
                }
                console.log(queue)
            }
        }
        return false;
    }
    // 二分法计算初始油量
    let left = 0,right = 100;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(check(mid)){
            right = mid - 1;
        }else{
            left = mid +1;
        }
    }
    console.log("最终结果")
    return left;
}

function getRes1(m,n,grid) {
    console.log(m,n,grid)
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    // 计算初始油量为start时，是否可以走到终点
    const check = (start)=>{
        // 每次都要重置visit,否则check前面的visit有的值已经被用了
        const visit = Array.from({length:m},()=>Array(n).fill(false));
        console.log("------------开始检查---------------")
        console.log("初始油量",start,"当前用油",grid[0][0],"剩余",start-grid[0][0])
        const bsf = (i,j,remain)=>{
            // 可以走到终点，返回true
            if(i==m-1 && j==n-1){
                console.log("走到终点")
                return true;
            }
            visit[i][j] = true;
            for(let [x,y] of directs){
                const newI = i+x,newJ = j+y;
                console.log("上下左右：",newI,newJ);
                // 不越界，没遍历过，且不是障碍物
                if(isInArea(newI,newJ) && !visit[newI][newJ] && grid[newI][newJ]!=0){
                    // 如果碰到加油站了，直接装满油
                    if(grid[newI][newJ]==-1){
                        remain = 100;
                        console.log("下标",newI,newJ,"遇到加油站加满",remain);
                    }else {
                        if (remain - grid[newI][newJ] < 0) {
                            console.log("不够了", newI, newJ)
                            return false;
                        }
                        remain -= grid[newI][newJ];
                        console.log("下标",newI,newJ,"当前用油",grid[newI][newJ],"剩下的油",remain);
                    }
                    if(dfs(newI,newJ,remain)) return true;
                    // 回溯
                    if(grid[newI][newJ]===-1){
                        remain = 100;
                    }else {
                        remain += grid[newI][newJ];
                    }
                    console.log("回溯：",newI,newJ,grid[newI][newJ],remain)
                }
            }
            return false;
        }
        return dfs(0,0,start-grid[0][0]);
    }
    // 二分法计算初始油量
    let left = 0,right = 100;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(check(mid)){
            right = mid - 1;
        }else{
            left = mid +1;
        }
    }
    console.log("最终结果")
    return left;
}