const rl = require("readline").createInterface({
    input :process.stdin
})
/*
给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
输入：n = 3
输出：[[1,2,3],[8,9,4],[7,6,5]]
示例 2：
输入：n = 1
输出：[[1]]
 */
rl.on("line",line=>{
    let n = parseInt(line);
    let res = [];
    let matrix = generateMatrix2(n);
    for(let i=0;i<n;i++){
        res.push(matrix[i]);
    }
    console.log(res)
})

// 解法1 两个变量 行和列 暴力循环
var generateMatrix = (n)=>{
    let matrix = new Array(n).fill(0).map(()=>new Array(n).fill(0));
    let col=0,row=0;
    let i=1;
    while(i<=n**2) {
        //     从左往右
        while (col < n && matrix[row][col] === 0 && i<=n**2) {
            matrix[row][col] = i++;
            col++;
        }
        //     恢复
        col--;
        row++;
        //     从上往下
        while (row < n && matrix[row][col] === 0 && i<=n**2) {
            matrix[row][col] = i++;
            row++;
        }

        //     恢复
        row--;
        col--;
        //     从右往左
        while (col >= 0 && matrix[row][col] === 0 && i<=n**2) {
            matrix[row][col] = i++;
            col--;
        }
        col++;
        row--;
        //     从下往上
        while (row >= 0 && matrix[row][col] === 0 && i<=n**2) {
            matrix[row][col] = i++;
            row--;
        }
        row++;
        col++;
    }
    return matrix;
}

// 解法2 四个变量 上下左右 暴力循环 （如果矩阵是长方形，则不符合）
var generateMatrix1 = (n)=>{
    let matrix = new Array(n).fill(0).map(()=>new Array(n).fill(0));
    // 左右上下四个变量
    let l=0,r=n-1,t=0,b=n-1;
    let num=1;
    while(num<=n**2) {
        //     从左往右
        for(let i=l;i<=r;i++){
            matrix[t][i] = num++;
        }
        // 向下走一步
        t++;
        //     从上往下
        for(let i=t;i<=b;i++){
            matrix[i][r] = num++;
        }
        // 向左走一步
        r--;
        //     从右往左
        for(let i=r;i>=l;i--){
            matrix[b][i] = num++;
        }
        // 向上走一步
        b--;
        //     从下往上
        for(let i=b;i>=t;i--){
            matrix[i][l] = num++;
        }
        // 向右走一步
        l++;
    }
    return matrix;
}

// 解法3  最优解法 每一步都设置边界，不符合则跳出 同54 ++t 先加后比较
var generateMatrix2 = function(n) {
    let matrix = new Array(n).fill(0).map(()=>new Array(n).fill(0));
    // 左右上下四个变量
    let l=0,r=n-1,t=0,b=n-1;
    let num=1;
    while(true) {
        //     从左往右
        for(let i=l;i<=r;++i){
            matrix[t][i] = num++;
        }
        // 向下走一步--越过则跳出
        if(++t>b) break;
        //     从上往下
        for(let i=t;i<=b;i++){
            matrix[i][r] = num++;
        }
        // 向左走一步
        if(--r<l) break;
        //     从右往左
        for(let i=r;i>=l;i--){
            matrix[b][i] = num++;
        }
        // 向上走一步
        if(--b<t) break;
        //     从下往上
        for(let i=b;i>=t;i--){
            matrix[i][l] = num++;
        }
        // 向右走一步
        if(++l>r) break;
    }
    return matrix;
};