/*
题目
在一个机房中，服务器的位置标识在 n*m 的整数矩阵网格中，1 表示单元格上有服务器，0 表示没有。如果两台服务器位于同一行或者同一列中紧邻的位置，则认为它们之间可以组成一个局域网。
请你统计机房中最大的局域网包含的服务器个数。

输入描述
第一行输入两个正整数，n和m，0<n,m<=100
之后为n*m的二维数组，代表服务器信息

输出描述
最大局域网包含的服务器个数。

用例
输入
2 2
1 0
1 1
输出	3

输入
4 4
1 0 0 1
1 1 0 1
1 1 1 0
1 0 0 0
输出7
说明	[0][0]、[1][0]、[1][1]三台服务器相互连接，可以组成局域网
原文链接：https://blog.csdn.net/scm06111/article/details/141405311
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [n,m] = (await readline()).split(" ").map(Number);
    const grid = [];
    for(let i=0;i<n;i++){
        grid.push((await readline()).split(" ").map(Number))
    }
    console.log(getRes(n,m,grid));
})()

// 思路：层序遍历 bfs 记录1的个数，取最大岛屿的面积
const getRes = (n,m,grid)=>{
    console.log(n,m,grid);
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
    const isInArea = (i,j)=>{
        return i>=0 && j>=0 && i<n && j<m;
    }
    let res = 0;
    let count = 1;
    const bfs = (row,col)=>{
        grid[row][col] = 2;
        let queue = [[row,col]];
        console.log("找到第",count,"个服务器",row,col,grid[row][col]);
        while(queue.length){
            let size = queue.length;
            for(let x=0;x<size;x++) {
                const [i,j] = queue.shift();
                console.log("当前服务器，继续找", i, j)
                for (let v of directs) {
                    let newI = i + v[0], newJ = j + v[1];
                    console.log("上下左右：", newI, newJ);
                    if (isInArea(newI, newJ) && grid[newI][newJ] == 1) {
                        count++;
                        // 标记遍历过
                        grid[newI][newJ] = 2;
                        console.log("找到第", count, "个服务器", newI, newJ, grid[newI][newJ]);
                        queue.push([newI, newJ]);
                    }
                }
            }
        }
    }
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(grid[i][j]===1){
                console.log("---------开始岛屿-------")
                bfs(i,j);
                res = Math.max(res,count);
            //     恢复初始值
                count = 1;
            }
        }
    }
    return res;
}