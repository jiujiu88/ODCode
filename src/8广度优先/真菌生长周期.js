/*
题目描述
实验室最近在研究一种真菌的生长周期，为了初期研究的简单性，实验室定制了一个矩阵培养皿，
矩阵培养皿由 m 行 n 列的格子组成，真菌每隔一天就会将四周相邻格子长满。
假设，初始时科学家任选多个格子滴入真菌，请问该种真菌至少需要多少天可以将培养皿所有格子长满。

输入描述
第一行输入两个数字 m 和 n。以空格分隔。
第二行输入多个数字，每两个一组，分别代表初期滴入真菌位置的行号和列号。以空格分隔。

输出描述
输出一个整数，表示真菌长满所有培养皿格子至少所需的天数。

用例
输入
8 8
0 4 2 1 2 5 3 7 4 2 6 1 7 5
输出
3
说明
原文链接：https://blog.csdn.net/qfc_128220/article/details/127711317
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const [m,n] = (await readline()).split(" ").map(Number);
    const list = (await readline()).split(" ").map(Number);
    getRes(m,n,list);
})()

// 思路：层序遍历，每一层扩散后更新网格数据为1，并记录扩散的个数，直到m*n格都扩散完了，记录层数
function getRes(m,n,list) {
    // console.log(m,n,sx,sy,k,obs)
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
//     构建网格
    const grid = Array.from({length:m},()=>Array(n).fill(0));
//     设置细菌的位置值为1
    let queue = [];

    for(let i=0;i<list.length;i+=2){
        grid[list[i]][list[i+1]] = 1;
        queue.push([list[i],list[i+1]]);
    }
    // console.log(grid)
    let time = 0;
    // count记录格子总数，有细菌就-1，直到为0则格子被完全感染，初始时要减去开始的细菌
    let count = m*n-queue.length;
//     层序遍历  将初始为有细菌的格子设置为根节点
    while(queue.length>0){
        let size = queue.length;
        for(let q=0;q<size;q++){
            const [i,j] = queue.shift();
            for(let [x,y] of directs){
                let newI = i+x,newJ = j+y;
                // 如果没越界，且为0表示没遍历过，则加入下一层
                if(isInArea(newI,newJ) && grid[newI][newJ]===0){
                    grid[newI][newJ] = 1;
                    // 未被感染格子-1
                    count--;
                    queue.push([newI, newJ]);
                }
            }
        }
        time++;
        // 已经全部感染，跳出
        if(count<=0) break;
        // console.log("---",time,"---",grid);
    }
    console.log(time);
}