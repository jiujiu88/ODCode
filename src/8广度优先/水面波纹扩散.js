/*
题目描述
当我们将一颗石子丢入一个平静的湖面，那么在丢入位置会产生一圈水面波纹逐渐扩散开来。
我们假设湖面是一个 m 行 n 列的矩阵区域，石子丢入位置处于矩阵的第 sx 行第 sy 列，
石子丢入水中产生的初始波纹 k，每当波纹扩散到一个新位置，则对应波纹高度减 1。如果新位置是柱子，则波纹无法通过，
即柱子位置的波纹高度直接将为 0。当波纹高度变为 0 时，则波纹消失。
现在请你计算出湖面中所有位置的波纹高度。

输入描述
第一行输入湖面矩阵的行数 m 和列数 n。以空格分隔。
第二行输入石子的丢入位置 sx 和 sy，以及初始波纹高度 k。以空格分隔。
第三行输入湖面中多个柱子位置，每两个一组（横坐标，纵坐标）。以空格分隔。格式见具体用例。

输出描述
输出一个 m 行 n 列的矩阵，矩阵元素值是丢入石子后，对应湖面位置的波纹高度。格式见具体用例。

用例
输入
3 3
1 1 3
0 0
输出
0 2 1
2 3 2
1 2 1
说明	无

输入
4 4
1 1 2
2 2
输出
0 1 0 0
1 2 1 0
0 1 0 0
0 0 0 0
说明	无

输入
4 4
1 1 3
2 2
输出
1 2 1 0
2 3 2 1
1 2 0 0
0 1 0 0

输入
4 4
1 1 4
2 2
输出
2 3 2 1
3 4 3 2
2 3 0 1
1 2 1 0

输入
4 4
1 1 7
2 2
输出
5 6 5 4
6 7 6 5
5 6 0 4
4 5 4 3
原文链接：https://blog.csdn.net/qfc_128220/article/details/128233067
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const [m,n] = (await readline()).split(" ").map(Number);
    const [sx,sy,k] = (await readline()).split(" ").map(Number);
    const obs =(await readline()).split(" ").map(Number);
    getRes(m,n,sx,sy,k,obs);
})()

// 思路：层序遍历，每一层扩散后更新网格数据为层数，并记录扩散的个数，直到m*n格都扩散完了，记录网格结果。
// ！注意：1、格子高度最小为0，不能出现负数 2、开始赋值障碍物为-1，保证不被遍历到，最后设置其他格子后，将障碍物设置为0
function getRes(m,n,sx,sy,k,obs) {
    // console.log(m,n,sx,sy,k,obs)
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
//     构建网格
    const grid = Array.from({length:m},()=>Array(n).fill(0));
//     设置障碍物的位置值为-1，避免遍历时将他设置为其他高度而辐射改变四周的值
    for(let i=0;i<obs.length;i+=2){
        grid[obs[i]][obs[i+1]] = -1;
    }
    // console.log(grid)
//     层序遍历  将石子位置作为根节点
    let queue = [[sx,sy,k]];
    let height = k;
    // 高度一旦到了0，就不能再减了，因此设置height>0的条件
    while(queue.length>0 && height>0){
        // 获取下一层节点的高度
        height--;
        let size = queue.length;
        for(let q=0;q<size;q++){
            const [i,j,h] = queue.shift();
            // 遍历到当前，设置值
            grid[i][j] = h;
            for(let [x,y] of directs){
                let newI = i+x,newJ = j+y;
                // 如果没越界，且为0表示没遍历过，则加入下一层
                if(isInArea(newI,newJ) && grid[newI][newJ]==0){
                    queue.push([newI, newJ,height]);
                }
            }
        }
        // console.log(grid);
    }
//     ！！最后将障碍物设置为0
    for(let i=0;i<obs.length;i+=2){
        grid[obs[i]][obs[i+1]] = 0;
    }
//     输出grid
    grid.forEach(v=>console.log(v.join(" ")));
}

/*
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    const [m, n] = (await readline()).split(" ").map(Number);

    const matrix = new Array(m).fill(0).map(() => new Array(n).fill(0));

    const [sx, sy, k] = (await readline()).split(" ").map(Number);
    matrix[sx][sy] = k;

    const nums = (await readline()).split(" ").map(Number);
    for (let i = 0; i < nums.length; i += 2) {
        const x = nums[i];
        const y = nums[i + 1];
        matrix[x][y] = -1;
    }

    const queue = [[sx, sy]];

    // 上下左右偏移量
    const offsets = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    // bfs按层扩散
    while (queue.length > 0) {
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const [x, y] = queue.shift();
            for (let offset of offsets) {
                const newX = x + offset[0];
                const newY = y + offset[1];

                if (
                    newX >= 0 &&
                    newX < m &&
                    newY >= 0 &&
                    newY < n &&
                    matrix[newX][newY] == 0
                ) {
                    matrix[newX][newY] = matrix[x][y] - 1;

                    if (matrix[newX][newY] > 0) {
                        queue.push([newX, newY]);
                    }
                }
            }
        }
    }

    for (let i = 0; i < nums.length; i += 2) {
        const x = nums[i];
        const y = nums[i + 1];
        matrix[x][y] = 0;
    }

    console.log(matrix.map((row) => row.join(" ")).join("\n"));
})();*/