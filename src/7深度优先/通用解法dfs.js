const rl = require("readline").createInterface({
    input:process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const [n,m,k] = (await readline()).split(" ");
    let grid = new Array(n).fill(0);
    for(let i=0;i<n;i++){
        grid[i] = (await readline()).split("");
    }
    // console.log("grid",grid);
//     计算地图上有多少区域的敌人小于k
    let res = 0;
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
    // 记录一个区域的敌人
    let count = 0;
    const isInArea = (grid,r,c)=>{
        return r>=0 && r<n && c>=0 && c<m;
    }
    const dfs = (grid,r,c)=>{
        if(grid[r][c]=="E"){
            // console.log("敌人")
            count++;
        }
        // 赋值,避免再次遍历
        grid[r][c] = "#";
        console.log(grid)
        for(let v of directs){
            let i = r+v[0],j = c+v[1];
            // 如果不是墙壁，找周围的敌人
            if(isInArea(grid,i,j) && grid[i][j]!="#"){
                // console.log(i,j)
                dfs(grid,i,j);
            }
        }

    }
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(grid[i][j]!="#"){
                // console.log("开始",i,j,count,res)
                dfs(grid,i,j);
                res += count<k ? 1 : 0;
                //     恢复
                count = 0;
            }
        }
    }
    console.log(res);
})()
