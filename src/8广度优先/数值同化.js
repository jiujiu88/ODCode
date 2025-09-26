/*
题目描述
存在一个m*n的二维数组，其成员取值范围为0，1，2。
其中值为1的元素具备同化特性，每经过1S，将上下左右值为0的元素同化为1。
而值为2的元素，免疫同化。
将数组所有成员随机初始化为0或2，再将矩阵的[0, 0]元素修改成1，在经过足够长的时间后求矩阵中有多少个元素是0或2（即0和2数量之和）。

输入描述
输入的前两个数字是矩阵大小。后面是数字矩阵内容。

输出描述
返回矩阵中非1的元素个数。

测试样例1
输入：
4 4
0 0 0 0
0 2 2 2
0 2 0 0
0 2 0 0
输出：
9

说明
输入数字前两个数字是矩阵大小。后面的数字是矩阵内容。
起始位置(0,0)被修改为1后，最终只能同化矩阵为：
1 1 1 1
1 2 2 2
1 2 0 0
1 2 0 0
原文链接：https://blog.csdn.net/weixin_66855397/article/details/144001394
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
//     层序遍历
    let queue = [[0,0]];
    grid[0][0] = 1;
    // 记录1的个数，由于开始都是0或2，所以1只能是遍历改变的.
    let count = 1;
    while(queue.length){
        let size = queue.length;
        for(let q=0;q<size;q++){
            const [i,j] = queue.shift();
            for(let [x,y] of directs){
                let newI = i+x,newJ = j+y;
                // 没越界，不是空地，都加上
                if(isInArea(newI,newJ) && grid[newI][newJ]==0){
                    // 遍历过设置为1
                    grid[newI][newJ] = 1;
                    count++;
                    queue.push([newI,newJ]);
                }
            }
        }
    }
    console.log(m*n-count);
}