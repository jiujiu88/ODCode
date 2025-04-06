// 岛屿问题 先污染后治理
// 海洋为0 岛屿为1
const dfs = (grid,r,c)=>{
//     查找边界 超过边界就返回
    if(!inArea(grid,r,c)){
        return;
    }
//     已经遍历过的岛屿标记为2，避免重复遍历
    if(grid[r][c]!=1){
        return;
    }
//     遍历过就标记为2
    if(grid[r][c]==1){
        grid[r][c] = 2;
    }
//     上下左右
    dfs(grid,r-1,c);
    dfs(grid,r+1,c);
    dfs(grid,r,c-1);
    dfs(grid,r,c+1);
}

const inArea = (grid,r,c)=>{
    return r>=0 && r<grid.length && c>=0 && c<grid[0].length;
}