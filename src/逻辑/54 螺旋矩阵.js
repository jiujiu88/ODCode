/*
给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
示例 1：
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
rl.on("line",line=>{
    let matrix = JSON.parse(line);
    console.log(spiralOrder(matrix))
})

var spiralOrder = function(matrix) {
    if(matrix==[]) return [];
    const m = matrix.length,n=matrix[0].length;
    let arr = new Array(m);
    for(let i=0;i<m;i++){
        arr[i] = matrix[i];
    }
    let res = [];
    let num=1;
    let left=0,right=n-1,up=0,down=m-1;
    while(true){
        // 从左到右
        for (let i = left; i <= right; i++) {
            res.push(arr[up][i]);
        }
        // 向下走一步
        if(++up>down) break;
        // 从上到下
        for (let i = up; i <= down; i++) {
            res.push(arr[i][right]);
        }
        // 向左走一步
        if(--right<left) break;
        // 从右到左
        for (let i = right; i >= left; i--) {
            res.push(arr[down][i]);
        }
        // 向上走一步
        if(--down<up) break;
        // 从下到上
        for (let i = down; i >= up; i--) {
            res.push(arr[i][left]);
        }
        // 向右走一步
        if(++left>right) break;
    }
    return res;
};