const rl = require("readline").createInterface({
    input :process.stdin
})
/*
给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
输入：n = 3
输出：[[1,2,3],[8,9,4],[7,6,5]]
 */
rl.on("line",line=>{
    let n = parseInt(line);
    // 创建二维数组
    let arr = new Array(n).fill("0").map(()=>new Array(n).fill("0"));
    // 四个方向写数字   左闭右开
    let row=0,col=0;
    let i = 1;
    let offset = 0;


    // 未填充过的，才填数字 每个循环都要限制i
    while(i<=n*n) {
        for(let j = col;j<n-offset;j++){

        }
        // 横向 左向右填充
        while (col < n && arr[row][col] == "0" && i<=n) {
            arr[row][col] = i++;
            col++;
        }
        // 恢复列
        col--;
        // 向下一行
        row++;
        // 纵向 上向下填充
        while (row < m && arr[row][col] == "*" && i<=n) {
            arr[row][col] = i++;
            row++;
        }
//     恢复行
        row--;
//     向左一列
        col--;
//     横向 右向左填充
        while (col >= 0 && arr[row][col] == "*" && i<=n) {
            arr[row][col] = i++;
            col--;
        }
        col++;
        row--;
        //     纵向 下向上填充
        while (row >= 0 && arr[row][col] == "*" && i<=n) {
            arr[row][col] = i++;
            row--;
        }
        row++;
        col++;
    }
    for(let i=0;i<m;i++){
        console.log(arr[i].join(" "))
    }
})