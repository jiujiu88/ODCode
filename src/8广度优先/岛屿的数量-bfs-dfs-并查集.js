/*
题目描述
有一个 N 行 M 列的海图，海图中陆地使用 1 标记，海洋使用 0 标记，相邻陆地可以构成岛屿，请你计算出海图中岛屿的数量。
注意：若陆地 A 位于陆地 B 的上、下、左、右、左上、左下、右上、右下位置时，则陆地 A 和陆地 B 是相邻的。

输入描述
第一行输入两个整数 N 和 M，分别表示海图的行数和列数。
之后输入 N 行，每行 M 个数（只会取值0或1），其中 0 表示海洋，1 表示陆地。

输出描述
请输出岛屿的数量。

用例
输入
4 3
0 1 0
0 0 0
1 0 0
1 1 0
输出
2
说明	无
原文链接：https://blog.csdn.net/qfc_128220/article/details/128263014
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const [m,n] = (await readline()).split(" ").map(Number);
    const grid = [];
    for(let i=0;i<m;i++){
        grid.push((await readline()).split(" ").map(Number));
    }
    console.log(getRes(m,n,grid));
})()

// 思路1：深度搜索
function getRes(m,n,grid) {
    // console.log(grid)
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    // 八个方向
    const directs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[-1,1],[1,-1]];
    const dfs = (i,j)=>{
        if(!isInArea(i,j) || grid[i][j]!=1){
            return;
        }
        // 遍历过的设置为2
        grid[i][j] = 2;
        for(let [x,y] of directs){
            let newI = i+x,newY = j+y;
            dfs(newI,newY);
        }
    }
    // 记录结果
    let count = 0;
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j]==1){
                dfs(i,j);
                count++;
            }
        }
    }
    console.log(grid)
    return count;
}

// 思路2：广度搜索
function getRes1(m,n,grid) {
    // console.log(grid)
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    // 八个方向
    const directs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[-1,1],[1,-1]];
    const bfs = (r,c)=>{
        let queue = [[r,c]];
        grid[r][c] = 2;
        while(queue.length){
            let size = queue.length;
            for(let q=0;q<size;q++){
                const [i,j] = queue.shift();
                for(let [x,y] of directs){
                    let newI = i+x,newJ = j+y;
                    if(isInArea(newI,newJ) && grid[newI][newJ]===1) {
                        // 设置为遍历过
                        grid[newI][newJ] = 2;
                        queue.push([newI, newJ]);
                    }
                }
            }
        }
    }
    // 记录结果
    let count = 0;
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j]==1){
                bfs(i,j);
                count++;
            }
        }
    }
    console.log(grid)
    return count;
}

// 思路2：并查集
function getRes2(m,n,grid) {
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    // 八个方向
    const directs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[-1,1],[1,-1]];
    class UnionFindSet{
        constructor(n){
            this.fa = Array(n).fill(0).map((_,idx)=>idx);
            // 初始化为n个
            this.count = n;
        }
        find(x){
            // 不为自己时才递归查找
            if(x!=this.fa[x]){
                return this.fa[x] = this.find(this.fa[x]);
            }else{
                return x;
            }
        }
        union(x,y){
            let fa_x = this.find(x);
            let fa_y = this.find(y);
            // 不在一个连通分量时，需要连接，连接后连通分量-1
            if(fa_x!=fa_y) {
                this.fa[fa_x] = fa_y;
                this.count--;
            }
        }
    }
    const ufs = new UnionFindSet(m*n);
    // 记录结果
    let count = 0;
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j]!=1){
                // 为0时，连通分量减少
                ufs.count--;
                continue;
            }
        //     当找到1时，八个方向进行合并
            for(let [x,y] of directs){
                let newI = i+x,newJ = j+y;
                if(isInArea(newI,newJ) && grid[newI][newJ]===1) {
                    // 将这个1周围的都合并起来--转化为一维下标
                    ufs.union(i*m+j,newI*m+newJ);
                }
            }
        }
    }
    return count;
}