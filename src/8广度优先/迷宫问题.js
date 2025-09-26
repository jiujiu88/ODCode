/*
描述
定义一个二维数组 N*M ，如 5 × 5 数组下所示：
int maze[5][5] = {
0, 1, 0, 0, 0,
0, 1, 1, 1, 0,
0, 0, 0, 0, 0,
0, 1, 1, 1, 0,
0, 0, 0, 1, 0,
};

它表示一个迷宫，其中的1表示墙壁，0表示可以走的路，只能横着走或竖着走，不能斜着走，要求编程序找出从左上角到右下角的路线。入口点为[0,0],既第一格是可以走的路。
本题含有多组数据。
数据范围： 2<= n,m <=10， 输入的内容只包含 0 <= val <=1

输入描述：
输入两个整数，分别表示二维数组的行数，列数。再输入相应的数组，其中的1表示墙壁，0表示可以走的路。数据保证有唯一解,不考虑有多解的情况，即迷宫只有一条通道。

输出描述：
左上角到右下角的最短路径，格式如样例所示。

输入：
5 5
0 1 0 0 0
0 1 1 1 0
0 0 0 0 0
0 1 1 1 0
0 0 0 1 0
输出：
(0,0)
(1,0)
(2,0)
(2,1)
(2,2)
(2,3)
(2,4)
(3,4)
(4,4)
原文链接：https://blog.csdn.net/he__xu/article/details/121394360
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
    getRes(m,n,grid);
})()

// 思路：层序遍历，从[0,0]开始扩散，只要为0都变为1，记录变为1的个数，返回总数-1的个数。
function getRes(m,n,grid) {
    // console.log(grid)
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
//     层序遍历 从[0,0]开始走  ！！重点：要记录上次的节点，这样可以从终点反过来找到起点，因此队列中记录对象
    let queue = [{i:0,j:0,pre:undefined}];
    grid[0][0] = 2;
    while(queue.length){
        let size = queue.length;
        for(let q=0;q<size;q++){
            const cur = queue.shift();
            for(let [x,y] of directs){
                let newI = cur["i"]+x,newJ = cur["j"]+y;
                // 没越界，是空地，可以走
                if(isInArea(newI,newJ) && grid[newI][newJ]==0){
                    // 遍历过设置为2
                    grid[newI][newJ] = 2;
                    let next = {
                        i:newI,
                        j:newJ,
                        pre:cur
                    };
                    queue.push(next);
                //     如果走到终点，记录
                    if(newI==m-1 && newJ==n-1){
                        // 递归反向打印上一个节点
                        const getPre = (cur)=>{
                            if(cur.pre){
                                getPre(cur.pre);
                            }
                            console.log(`(${cur.i},${cur.j})`)
                        }
                        getPre(next);
                        return;
                    }
                }
            }
        }
    }
}