/*
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
此外，你可以假设该网格的四条边均被水包围。
示例 1：
输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
示例 2：

输入：
4 5
["1","1","0","0","0"]
["1","1","0","0","0"]
["0","0","1","0","0"]
["0","0","0","1","1"]
输出：3
 输入 n m 行 列
 n行的数据
 */
// 岛屿数量就是搜索的次数
const rl = require("readline").createInterface({
    input :process.stdin
})
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
   let [n,m] = await readline();
   let grid = new Array(n).fill(0);
   for(let i=0;i<n;i++){
       grid[i] = JSON.parse((await readline()));
   }
    console.log(grid);
   const dfs = (grid,r,c)=>{
       if(!inArea(grid,r,c)){
           return;
       }
       if(grid[r][c]!=1){
           return;
       }
       grid[r][c] = 2;
       //     上下左右
       dfs(grid,r-1,c);
       dfs(grid,r+1,c);
       dfs(grid,r,c-1);
       dfs(grid,r,c+1);
   }
   const inArea =(grid,r,c)=>{
       return r>=0 && r<grid.length && c>=0 && c<grid[0].length;
   }
   let count = 0;
   for(let i=0;i<grid.length;i++){
       for(let j=0;j<grid.length;j++){
           if(grid[i][j]==1){
               dfs(grid,i,j);
               count ++;
           }
       }
   }
    console.log(count);
}()