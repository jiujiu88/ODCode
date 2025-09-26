/*
题目描述
2XXX年，人类通过对火星的大气进行宜居改造分析，使得火星已在理论上具备人类宜居的条件;
由于技术原因，无法一次性将火星大气全部改造，只能通过局部处理形式;
假设将火星待改造的区域为row*column的网格，每个网格有3个值，宜居区、可改造区、死亡区，使用YES、NO、NA代替，
YES表示该网格已经完成大气改造，NO表示该网格未进行改造，后期可进行改造，NA表示死亡区，不作为判断是否改造完的宜居，无法穿过;
初始化下，该区域可能存在多个宜居区，并目每个宜居区能同时在每个大阳日单位向上下左右四个方向的相邻格子进行扩散，自动将4个方向相邻的真空区改造成宜居区:
请计算这个待改造区域的网格中，可改造区是否能全部成宜居区，如果可以，则返回改造的大阳日天教，不可以则返回-1

输入描述
输入row*column个网格数据，每个网格值枚举值如下:YES，NO，NA;
输出描述
可改造区是否能全部变成宜居区，如果可以，则返回改造的太阳日天数，不可以则返回-1。
备注
grid[i][j]只有3种情况，YES、NO、NA

样例
输入
YES YES NO
NO NO NO
YES NO NO
输出
2
说明
进过2个太阳日，完成宜居改造。

输入
YES NO NO NO
NO NO NO NO
NO NO NO NO
NO NO NO NO
输出
6
说明
经过6个太阳日，可完成改造。

输入
NO NA
输出
-1
说明
无改造初始条件，无法进行改造。

输入
YES NO NO YES
NO NO YES NO
NO YES NA NA
YES NO NA NO
输出
-1
说明
-1//右下角的区域，被周边三个死亡区挡住，无法实现改造。

原文链接：https://blog.csdn.net/fightingtt/article/details/132793837
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    // 不定长输入
    const grid = [];
    while ((line = await readline())) {
        grid.push(line.split(" "));
    }
    getRes(grid);
})()

// 思路：层序遍历，每一层扩散后更新网格数据为1，并记录扩散的个数，直到m*n格都扩散完了，记录层数
function getRes(grid) {
    const m = grid.length,n = grid[0].length;
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
//     记录可改造区的个数
    let count = 0;
    let queue = [];
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j]==='NO'){
                count++;
            }
            if(grid[i][j]==='YES'){
                queue.push([i,j]);
            }
        }
    }
    // 增加基础判断--也可以不加
    // 全是宜居区，则不需要改造
    // if(queue.length==m*n){
    //     return 0;
    // }
    // // 没有宜居区，无法实现改造，返回-1
    // if(queue.length==0){
    //     return -1;
    // }
    // console.log(grid)
//     层序遍历
    let level = 0;
    while(queue.length>0){
        // console.log("height",height)
        let size = queue.length;
        for(let q=0;q<size;q++){
            const [i,j] = queue.shift();
            for(let [x,y] of directs){
                let newI = i+x,newJ = j+y;
                // 如果没越界，且为-1表示没遍历过，则加入下一层
                if(isInArea(newI,newJ) && grid[newI][newJ]=='NO'){
                    grid[newI][newJ] = 'YES';
                    count--;
                    queue.push([newI, newJ]);
                }
            }
        }
        level++;
        if(count<=0) break;
    }
    // 因为有障碍物，如果最后还有没遍历到的，返回-1
    console.log(count>0 ? -1 : level);
}
