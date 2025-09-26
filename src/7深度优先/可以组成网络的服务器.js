/*
有一种特殊的加密算法，明文为一段数字串，经过密码本查找转换，生成另一段密文数字串。
规则如下：
明文为一段数字串由 0~9 组成
密码本为数字 0~9 组成的二维数组
需要按明文串的数字顺序在密码本里找到同样的数字串，密码本里的数字串是由相邻的单元格数字组成，上下和左右是相邻的，
注意：对角线不相邻，同一个单元格的数字不能重复使用。
每一位明文对应密文即为密码本中找到的单元格所在的行和列序号（序号从0开始）组成的两个数宇。
如明文第 i 位 Data[i] 对应密码本单元格为 Book[x][y]，则明文第 i 位对应的密文为X Y，X和Y之间用空格隔开。
如果有多条密文，返回字符序最小的密文。
如果密码本无法匹配，返回"error"。
请你设计这个加密程序。

示例1：
输入
1
3
3
0 0 2
1 3 4
6 6 4
输出
1 1
明文："3"，密文："1 1"

示例2：
输入
2
0 3
3
0 0 2
1 3 4
6 6 4
输出
0 1 1 1
明文："0 3"，密文："0 1 1 1"

示例3：
输入
4
0 0 2 4
4
0 0 2 4
1 3 4 6
3 4 1 5
6 6 6 5
输出
0 0 0 1 0 2 0 3
明文："0 0 2 4"，密文："0 0 0 1 0 2 0 3" 和 "0 0 0 1 0 2 1 2"，返回字典序最小的"0 0 0 1 0 2 0 3"

输入
4
8 2 2 3
4
0 0 2 4
1 3 4 6
3 4 1 5
6 6 6 5
输出
error
明文："8 2 2 3"，密文："error"，密码本中无法匹配<

原文链接：https://blog.csdn.net/2301_76543445/article/details/141085980
* */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const len = parseInt(await readline());
    const datas = (await readline()).split(" ").map(Number);
    const m = parseInt(await readline());
    let grid = [];
    for(let i=0;i<m;i++){
        grid.push((await readline()).split(" ").map(Number));
    }
    console.log(getRes(len,datas,m,grid));
})()

const getRes = (len,datas,m,grid)=>{
    const n = grid[0].length;
//     为了字典序更小 方向上左右下  11   01 21 10 12
    const directs = [[-1,0],[0,-1],[0,1],[1,0]];
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    const visit = Array(m).fill(false).map(()=>Array(n).fill(false));
    let path = [];
    // 返回是否成功
    const dfs = (i,j,index,datas)=>{
        if(!isInArea(i,j) || grid[i][j]!==datas[index] || visit[i][j]){
            return false;
        }
        // 设置为已访问，并记录坐标
        path.push(i+" "+j);
        visit[i][j]=true;
        // console.log(i,j,index,path,visit)
        // 返回
        if(index+1===len){
            return true;
        }
        for(let [x,y] of directs){
            let newI = i+x,newJ = j+y;
            if(dfs(newI,newJ,index+1,datas)){
                return true;
            }
        }
    //     回溯
        path.pop();
        visit[i][j]=false;
        return false;
    }
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++) {
            if(dfs(i,j,0,datas)){
                return path.join(" ");
            }
        }
    }
    return "error";
}