/*
题目描述
围棋棋盘由纵横各19条线垂直相交组成，棋盘上一共19 x 19 = 361 个交点，对弈双方一方执白棋，一方执黑棋，落子时只能将棋子置于交点上。

“气”是围棋中很重要的一个概念，某个棋子有几口气，是指其上下左右方向四个相邻的交叉点中，有几个交叉点没有棋子，由此可知：

在棋盘的边缘上的棋子最多有 3 口气（黑1），在棋盘角点的棋子最多有2口气（黑2），其他情况最多有4口气（白1）
所有同色棋子的气之和叫做该色棋子的气，需要注意的是，同色棋子重合的气点，对于该颜色棋子来说，只能计算一次气，比如下图中，黑棋一共4口气，而不是5口气，因为黑1和黑2中间红色三角标出来的气是两个黑棋共有的，对于黑棋整体来说只能算一个气。
本题目只计算气，对于眼也按气计算，如果您不清楚“眼”的概念，可忽略，按照前面描述的规则计算即可。
现在，请根据输入的黑棋和白棋得到坐标位置，计算黑棋和白棋一共各有多少气？

输入描述
输入包含两行数据，
每行数据以空格分隔，数据个数是2的整数倍，每两个数是一组，代表棋子在棋盘上的坐标；
坐标的原点在棋盘左上角点，第一个值是行号，范围从0到18；第二个值是列号，范围从0到18。
举例说明：如：

0 5 8 9 9 10
5 0 9 9 9 8

第一行数据表示三个坐标（0, 5）、(8, 9)、(9, 10)
第一行表示黑棋的坐标，第二行表示白棋的坐标。
题目保证输入两行数据，无空行且每行按前文要求是偶数个，每个坐标不会超出棋盘范围。

输出描述
两个数字以空格分隔，第一个数代表黑棋的气数，第二个数代表白棋的气数。
8 7

用例
输入
0 5 8 9 9 10
5 0 9 9 9 8
输出

8 7
1
说明

数数黑棋一共8口气，数数白棋一共7口气。

原文链接：https://blog.csdn.net/banxia_frontend/article/details/134908319
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const black = (await readline()).split(" ").map(Number);
    const white = (await readline()).split(" ").map(Number);
    console.log(getRes1(black,white));
})()

// 思路：循环空白位置，如果他的上下左右有黑棋，就是黑棋的气；如果有白棋，则是白棋的气
const getRes = (black,white)=>{
    // console.log(black,white);
//     定义棋盘
    const grid = Array(19).fill(0).map(()=>Array(19).fill(0));
    for(let i=0;i<black.length;i+=2){
        let x = black[i];
        let y = black[i+1];
        grid[x][y] = 1;
    }
    for(let i=0;i<white.length;i+=2){
        let x = white[i];
        let y = white[i+1];
        grid[x][y] = 2;
    }
    // console.log(grid);
    let directs = [[-1,0],[1,0],[0,-1],[0,1]];
    let blackCnt = 0,whiteCnt = 0;
    for(let i=0;i<19;i++){
        for (let j = 0; j < 19; j++){
            // 当前位置没有棋子，可能是气
            if(grid[i][j] == 0){
                let isBlack = false;
                let isWhite = false;
                for(let [x,y] of directs){
                    let newR = i+x,newC=j+y;
                    // 如果他的上下左右没有越界，开始判断
                    if(newR>=0 && newR<19 && newC>=0 && newR<19){
                        // 如果周围有黑棋，则是黑棋的气；如果周围有白棋，则是白棋的气
                        isBlack = isBlack || grid[newR][newC]==1;
                        isWhite = isWhite || grid[newR][newC]==2;
                    }
                }
                if(isBlack) blackCnt++;
                if(isWhite) whiteCnt++;
            }
        }
    }
    return blackCnt+" "+whiteCnt;
}

// 思路2：循环棋子位置，如果他的上下左右是空白，设置为3；白棋周围有空白，设置为4，黑白都经过设置为7
const getRes1 = (black,white)=>{
    // console.log(black,white);
//     定义棋盘
    const grid = Array(19).fill(0).map(()=>Array(19).fill(0));
    for(let i=0;i<black.length;i+=2){
        let x = black[i];
        let y = black[i+1];
        grid[x][y] = 1;
    }
    for(let i=0;i<white.length;i+=2){
        let x = white[i];
        let y = white[i+1];
        grid[x][y] = 2;
    }
    // console.log(grid);
    let directs = [[-1,0],[1,0],[0,-1],[0,1]];
    let blackCnt = 0,whiteCnt = 0;
    for(let i=0;i<19;i++){
        for (let j = 0; j < 19; j++){
            // 遍历棋子
            if(grid[i][j] ==1){
                for(let [x,y] of directs){
                    let newR = i+x,newC=j+y;
                    // 如果他的上下左右没有越界，开始判断
                    if(newR>=0 && newR<19 && newC>=0 && newR<19 && (grid[newR][newC]==0 || grid[newR][newC]==4)){
                        grid[newR][newC] += 3;
                    }
                }
            }
            if(grid[i][j] ==2){
                for(let [x,y] of directs){
                    let newR = i+x,newC=j+y;
                    // 如果他的上下左右没有越界，开始判断 此时可能遇到黑棋的气口，可以累加，表示是黑白共同的气口
                    if(newR>=0 && newR<19 && newC>=0 && newR<19 && (grid[newR][newC]==0 || grid[newR][newC]==3)){
                        grid[newR][newC] += 4;
                    }
                }
            }
        }
    }
    // 再循环一次，找到个数
    for(let i=0;i<19;i++){
        for (let j = 0; j < 19; j++){
            // 遍历棋子
            if(grid[i][j] ==7||grid[i][j] ==3){
                blackCnt++;
            }
            if(grid[i][j] ==7||grid[i][j] ==4){
                whiteCnt++;
            }
        }
    }
    // console.log(grid);
    return blackCnt+" "+whiteCnt;
}