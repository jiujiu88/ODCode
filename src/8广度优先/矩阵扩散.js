/*
题目描述
存在一个m*n的二维数组，其成员取值范围为0，1。其中值为1的元素具备扩散性，每经过1S，将上下左右值为0的元素同化为1。
将数组所有成员初始化为0，将矩阵的[i, j]和[m,n]位置上元素修改成1后，在经过多长时间所有元素变为1。

输入描述
输出数据中的前2个数字表示这是一个m*n的矩阵，m和n不会超过1024大小;
中间两个数字表示一个初始扩散点位置;最后2个数字表示另一个扩散点位置。

三、输出描述
输出矩阵的所有元素变为1所需要秒数。

用例
输入
4,4,0,0,3,3
输出
3
说明
输入数据中的前2个数字表示这是一个4*4的矩阵；
中间两个数字表示一个初始扩散点位置为0,0；
最后2个数字表示另一个扩散点位置为3,3。
给出的样例是一个简单模型，初始点在对角线上，达到中间的位置分别为3次迭代，即3秒。所以输出为3。

原文链接：https://blog.csdn.net/lbp0123456/article/details/143017929
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const [m,n,x1,y1,x2,y2] = (await readline()).split(",").map(Number);
    console.log(getRes(m,n,x1,y1,x2,y2));
})()

// 思路：层序遍历，从两个点开始扩散，只要为0都变为1，结果为全部变为1的层数
function getRes(m,n,x1,y1,x2,y2) {
    console.log(m,n,x1,y1,x2,y2)
    const isInArea = (i,j)=>{
        return i>=0 && i<m && j>=0 && j<n;
    }
    const directs = [[-1,0],[1,0],[0,-1],[0,1]];
    const grid = Array.from({length:m},()=>Array(n).fill(0));
//     层序遍历
    let queue = [[x1,y1],[x2,y2]];
    grid[x1][y1] = 1;
    grid[x2][y2] = 1;
    // 记录需要从0变为1的个数
    let count = m*n-2;
    let level = 0;
    while(queue.length && count>0){
        let size = queue.length;
        for(let q=0;q<size;q++){
            const [i,j] = queue.shift();
            for(let [x,y] of directs){
                let newI = i+x,newJ = j+y;
                // 没越界，不是空地，都加上
                if(isInArea(newI,newJ) && grid[newI][newJ]==0){
                    // 遍历过设置为1
                    grid[newI][newJ] = 1;
                    count--;
                    queue.push([newI,newJ]);
                }
            }
        }
        level++;
    }
    return level;
}