/*
题目描述
小华按照地图去寻宝，地图上被划分成 m 行和 n 列的方格，横纵坐标范围分别是 [0, n-1] 和 [0, m-1]。
在横坐标和纵坐标的数位之和不大于 k 的方格中存在黄金（每个方格中仅存在一克黄金），
但横坐标和纵坐标数位之和大于 k 的方格存在危险不可进入。小华从入口 (0,0) 进入，任何时候只能向左，右，上，下四个方向移动一格。
请问小华最多能获得多少克黄金？

输入描述
坐标取值范围如下：
0 ≤ m ≤ 50
0 ≤ n ≤ 50
k 的取值范围如下：
0 ≤ k ≤ 100
输入中包含3个字数，分别是m, n, k

输出描述
输出小华最多能获得多少克黄金

用例
输入	40 40 18
输出	1484
说明	无
输入	5 4 7
输出	20
说明	无
原文链接：https://blog.csdn.net/banxia_frontend/article/details/134901578
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function () {
    const [m, n, k] = (await readline()).split(" ").map(Number);
    console.log(getRes(m, n, k));
})()

// 计算数位之和 例如 grid[10][21] 横坐标数位为1+0=1，纵坐标为2+1=3，和为4
const getSum = (idx)=>{
    let sum = 0;
    while(idx!==0){
        let digit = idx%10;
        sum +=digit;
        idx = Math.floor(idx/10);
    }
    return sum;
}
const getRes = (m,n,k)=>{
    // console.log(m,n,k);
//     将地图可进的地方设置为1，不可进的地方设置为0。相当于从(0,0)走到所有1的地方
    let grid = Array.from({length:m},()=>Array(n).fill(0));
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
    const isInArea = (i,j)=>{
        return i>=0 && j>=0 && i<m && j<n;
    }
    let res = 0;
    // 缓存数位之和，避免重复计算
    let cache = Array.from({length:m},()=>Array(n).fill(-1));
    const dfs = (i,j)=>{
        // 越界，返回
        if(!isInArea(i,j)){
            return;
        }
        // 缓存，记录位移和
        if(cache[i][j]===-1){
            cache[i][j] = getSum(i)+getSum(j);
        }
        // 不可访问、已遍历过都返回
        if(cache[i][j]>k || grid[i][j]===1){
            return;
        }
        // 如果遍历到了，设置为1
        grid[i][j]=1;
        // 遍历4个方向
        for(let v of directs){
            let newI = i + v[0],newJ = j+v[1];
            dfs(newI,newJ);
        }
    }
    // 从（0，0）开始
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            dfs(i,j);
        }
    }
//     所有能到的地方都设置为1，返回1的个数就是能取到的黄金
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j]===1){
                res++;
            }
        }
    }
    return res;
}