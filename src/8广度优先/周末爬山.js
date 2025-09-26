/*
题目描述
周末小明准备去爬山锻炼，0代表平地，山的高度使用1到9来表示，小明每次爬山或下山高度只能相差k及k以内，
每次只能上下左右一个方向上移动一格，小明从左上角(0,0)位置出发

输入描述
第一行输入m n k(空格分隔)
代表m*n的二维山地图，k为小明每次爬山或下山高度差的最大值，
然后接下来输入山地图，一共m行n列，均以空格分隔。取值范围：
0 < m ≤ 500
0< n ≤ 500
0 < k < 5
备注
所有用例输入均为正确格式，且在取值范围内，考生不需要考虑不合法的输入格式。

输出描述
请问小明能爬到的最高峰多高，到该最高峰的最短步数，输出以空格分隔。
同高度的山峰输出较短步数。
如果没有可以爬的山峰，则高度和步数都返回0。

示例1
输入
5 4 1
0 1 2 0
1 0 0 0
1 0 1 2
1 3 1 0
0 0 0 9
输出
2 2
说明
根据山地图可知，能爬到的最高峰在(0,2)位置，高度为2，最短路径为(0,0)-(0,1)-(0,2)，最短步数为2。

示例2
输入
5 4 3
0 0 0 0
0 0 0 0
0 9 0 0
0 0 0 0
0 0 0 9
输出
0 0
说明
根据山地图可知，每次爬山距离3，无法爬到山峰上，步数为0。

原文链接：https://blog.csdn.net/banxia_frontend/article/details/141961897
 */
// 思路：深度搜索
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const [m,n,k] = (await readline()).split(" ").map(Number);
    const grid = [];
    for(let i=0;i<m;i++){
        grid.push((await readline()).split(" ").map(Number));
    }
    console.log(getRes(m,n,k,grid));
})()

// 思路：求最短路径，用层序遍历。参数：初始化最高峰为起点，最短步数为0，遍历中，高度差适合，能走到更高的地方，则更新步数(遍历层数)和最高峰
function getRes(m,n,k,grid) {
    // console.log(m,n,k,grid)
    const visit = Array.from({length:m},()=>Array(n).fill(false));
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    // 能达到的最高峰
    let maxH = grid[0][0];
    // 达到最高峰的最少步数
    let minStep = 0;
    // 层序遍历的层级，即步数
    let count = 0;
    // 要计算最短路径，用bfs
    let queue = [[0,0]];
    visit[0][0] = true;
    while(queue.length) {
        count++;
        let size = queue.length;
        for(let q=0;q<size;q++){
            const [i,j] = queue.shift();
            let preH = grid[i][j];
            console.log("第"+count+"层","下标：",i,j,"值",grid[i][j])
            for (let [x, y] of directs) {
                const newI = i + x, newJ = j + y;
                // 越界，或者访问过，或者与上一步相差高度超过k，都不能走
                if(isInArea(newI,newJ) && !visit[newI][newJ] && Math.abs(preH - grid[newI][newJ]) <= k) {
                    // 标记已走过
                    visit[newI][newJ] = true;
                    // 遇到了更新的山峰，则更新山峰高度和步数
                    if(grid[newI][newJ]>maxH){
                        maxH = grid[newI][newJ];
                        minStep = count;
                        console.log("更高",newI,newJ,maxH,minStep);
                    }
                    queue.push([newI, newJ]);
                }
            }
        }
    }
    //     记录结果
    // 请问小明能爬到的最高峰多高，到该最高峰的最短步数，输出以空格分隔。同高度的山峰输出较短步数。如果没有可以爬的山峰，则高度和步数都返回0。
    if(maxH==0){
        return "0 0";
    }else{
        return `${maxH} ${minStep}`
    }
}