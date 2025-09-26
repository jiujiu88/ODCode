/*
题目描述
给你一个由 '0' (空地)、'1' (银矿)、'2'(金矿) 组成的的地图，矿堆只能由上下左右相邻的金矿或银矿连接形成。超出地图范围可以认为是空地。
假设银矿价值1，金矿价值2 ，请你找出地图中最大价值的矿堆并输出该矿堆的价值。

输入描述
地图元素信息
地图范围最大 300*300
0 ≤ 地图元素 ≤ 2

输出描述
矿堆的最大价值

用例1
输入
22220
00000
00000
01111
输出
8

用例2
输入
22220
00020
00010
01111
输出
15

用例3
输入
20000
00020
00000
00111
输出
3

原文链接：https://blog.csdn.net/qq_34143141/article/details/131466548
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const grid = [];
    while(line=(await readline())){
        grid.push(line.split("").map(Number));
    }
    getRes(grid);
})()

// 思路：层序遍历，找到每个岛屿的价值和，求最大即可
function getRes(grid) {
    // console.log(grid)
    const m = grid.length,n = grid[0].length;
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
//     层序遍历 只要不是空地，都加上
    const bfs = (grid,r,c)=>{
        let queue = [[r,c]];
        let sum = grid[r][c];
        // 设置为0，即遍历过
        grid[r][c] = 0;
        while(queue.length){
            let size = queue.length;
            for(let q=0;q<size;q++){
                const [i,j] = queue.shift();
                for(let [x,y] of directs){
                    let newI = i+x,newJ = j+y;
                    // 没越界，不是空地，都加上
                    if(isInArea(newI,newJ) && grid[newI][newJ]!=0){
                        // 先加上值
                        sum +=grid[newI][newJ];
                        // console.log(sum,grid[newI][newJ],newI,newJ)
                        // 设置为0，即遍历过
                        grid[newI][newJ] = 0;
                        queue.push([newI,newJ]);
                    }
                }
            }
            // console.log(queue)
        }
        return sum;
    }
//     先找一个有矿的地方开始遍历
    let max = 0;
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j]!==0){
                max = Math.max(max,bfs(grid,i,j));
            }
        }
    }
    console.log(max);
}