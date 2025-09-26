/*
题目描述
有一个 m 行 n 列的矩阵迷宫，迷宫的起点和终点是随机生成的，迷宫中各个位置上可能建了墙，也可能是空地，或者摆放有黄金。
现在请你找到一条从起点到终点的最短路长度，若存在多条这样的最短路，请选择获得黄金最多的那条。

输入描述
第一行输入两个正整数 m 和 n，以空格分隔。
第二行输入起点的坐标位置 x1, y1，以空格分隔。
第三行输入终点的坐标位置 x2, y2，以空格分隔。
之后 m 行，每行 n 个数，记录的是矩阵各个位置上的信息，其中 0 表示空地，-1 表示墙，正整数表示黄金数量。用例保证起点和终点位置上没有黄金。

输出描述
输出两个整数，分别代表最短路长度，以及该最短路上获得的黄金数量。以空格分隔。

用例
输入
5 5
2 1
1 0
2 2 3 0 4
0 7 9 3 6
2 0 2 1 5
5 9 6 0 5
9 6 1 1 -1
输出	2 7
说明	无
原文链接：https://blog.csdn.net/qfc_128220/article/details/135062353
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [m,n] = (await readline()).split(" ").map(Number);
    const [x1,y1] = (await readline()).split(" ").map(Number);
    const [x2,y2] = (await readline()).split(" ").map(Number);
    let grid = [];
    for(let i=0;i<m;i++){
        grid.push((await readline()).split(" ").map(Number));
    }
    console.log(getRes(m,n,x1,y1,x2,y2,grid));
})()


const getRes = (m,n,x1,y1,x2,y2,grid)=>{
    console.log(m,n,x1,y1,x2,y2,grid);
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
    // 保存黄金个数
    const gold = Array.from({length:m},()=>Array(n).fill(-1));
    const isInArea = (i,j)=>{
        return i>=0 && j>=0 && i<m && j<n;
    }
    let deep = 0;
    // 求最短路径，层序遍历
    // 从起点出发，层序遍历
     console.log("start",x1,y1)
     let queue = [[x1,y1]];
     gold[x1][y1] = grid[x1][y1];
     // 判断是否到了终点的那层,如果到了,则结束循环
     let isShort = false;
     while(queue.length && !isShort){
         deep++;
         let size = queue.length;
         for(let i=0;i<size;i++){
             console.log("第"+deep+"层有"+size+"个,循环到第"+i+"个")
             let [x,y] = queue.shift();
             console.log(x,y)
             for(let v of directs){
                 let newI = x+v[0],newJ = y+v[1];
                 // 不越界，不是墙壁，未访问过（黄金个数为-1），就可以继续访问
                 // console.log(newI,newJ,isInArea(newI,newJ),grid[newI][newJ],gold[newI][newJ]);
                 if(isInArea(newI,newJ) && grid[newI][newJ]!=-1){
                     // 如果是没访问过，则加入队列
                     if(gold[newI][newJ]==-1){
                         queue.push([newI,newJ]);
                     }
                     // 注意：在后面记录黄金的值！gold中记录当前值和他的上一个路径的财富值，表示沿途的财富总和
                     gold[newI][newJ] = Math.max(gold[newI][newJ],gold[x][y]+grid[newI][newJ]);
                     if(newI===x2 && newJ===y2){
                         isShort = true;
                         console.log("到终点了，遍历完这一层，下一层就不遍历了")
                     }
                 }
             }
         }
     }
    return deep+" "+gold[x2][y2];
}