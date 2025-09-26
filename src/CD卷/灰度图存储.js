/*
一、题目描述
黑白图像常采用灰度图的方式存储，即图像的每个像素填充一个灰色阶段值，256节阶灰图是一个灰阶值取值范围为0-255的灰阶矩阵，
0表示全黑，255表示全白，范围内的其他值表示不同的灰度。

但在计算机中实际存储时，会使用压缩算法，其中一个种压缩格式描述如下：

10 10 255 34 0 1 255 8 0 3 255 6 0 5 255 4 0 7 255 2 0 9 255 21

所有的数值以空格分隔；
前两个数分别表示矩阵的行数和列数；
从第三个数开始，每两个数一组，每组第一个数是灰阶值，第二个数表示该灰阶值从左到右，从上到下（可理解为二维数组按行存储在一维矩阵中）的连续像素个数。比如题目所述的例子， “255 34” 表示有连续 34 个像素的灰阶值是 255。
如此，图像软件在打开此格式灰度图的时候，就可以根据此算法从压缩数据恢复出原始灰度图矩阵。

请从输入的压缩数恢复灰度图原始矩阵，并返回指定像素的灰阶值。

输入描述
10 10 255 34 0 1 255 8 0 3 255 6 0 5 255 4 0 7 255 2 0 9 255 21
3 4
输入两行，第一行是灰度图压缩数据，第二行表示一个像素位置的行号和列号，如 0 0 表示左上角像素。

输出描述
0
输出数据表示的灰阶矩阵的指定像素的灰阶值。

原文链接：https://blog.csdn.net/guorui_java/article/details/138425175
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const list = (await readline()).split(" ").map(Number);
    const [r,c] = (await readline()).split(" ").map(Number);
    console.log(getRes(list,r,c));
})()

// 思路：二维转化为一维，计算target是第几个格子(r*n+c+1)，取当前的像素即可。
const getRes = (list,r,c)=>{
    // m行n列
    let m = list.shift();
    let n = list.shift();
//     将输入的填到二维数组中，可以直接算指定像素是第几个格子
//     例如grid[r][c],其实是第r*列数+c+1
    let count = r*n+c+1;
    // 计算到多少个像素
    let sum = 0;
    for(let i=0;i<list.length;i+=2){
        let color = list[i];
        let num = list[i+1];
        sum +=num;
        if(sum>=count){
            return color;
        }
    }
}