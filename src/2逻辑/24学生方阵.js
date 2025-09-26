/*
题目描述
学校组织活动，将学生排成一个矩形方阵
请在矩形方阵中找到最大的位置相连的男生数量
这个相连位置在一个直线上，方向可以是水平的，垂直的，成对角线的或者呈反对角线的。注: 学生个数不会超过10000

输入描述
输入的第一行为 矩阵的行数和列数，接下来的n行为矩阵元素，元素间用”,”分隔.

输出描述
输出一个整数，表示矩阵中最长的位置相连的男生个数

输入
3,4
F,M,M,F
F,M,M,F
F,F,F,M
输出
3

原文链接：https://blog.csdn.net/m0_58177653/article/details/130939275
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [m,n] = (await readline()).split(",").map(Number);
    const grid = [];
    for(let i=0;i<m;i++){
        grid.push((await readline()).split(","));
    }
    console.log(getRes(m,n,grid));
})()

// 思路：
const getRes = (m,n,grid)=>{
    console.log(m,n,grid);

}