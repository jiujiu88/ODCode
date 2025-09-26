/*
题目描述：
从前有个村庄，村民们喜欢在各种田地上插上小旗子，旗子上标识了各种不同的数字。
某天集体村民决定将覆盖相同数字的最小矩阵形的土地的分配给为村里做出巨大贡献的村民，
请问，此次分配土地，做出贡献的村民中最大会分配多大面积？
输入描述：
第一行输入m和n，m代表村子的土地的长，n代表土地的宽
第二行开始输入地图上的具体标识

输出描述：
输出需要分配的土地面积，即包含相同数字旗子的最小矩阵中的最大面积。

补充说明：
旗子上的数字为1-500，土地边长不超过500
示例1
输入：
3 3
1 0 1
0 0 0
0 1 0
输出：
9
原文链接：https://blog.csdn.net/qq_34465338/article/details/135102789
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [x,y] = (await readline()).split(" ").map(Number);
    let grid = [];
    for(let i=0;i<x;i++){
        grid.push((await readline()).split(" ").map(Number));
    }
    console.log(getRes(x,y,grid));
})()

// 思路：用对象存数组，key为🚩，value为[最小行，最大行，最小列，最大列]。最后循环(对象用in)计算数组的面积，取最大。
const getRes = (x,y,grid)=>{
    let obj = {};
    for(let i=0;i<x;i++){
        for(let j=0;j<y;j++){
            // 有插旗的，记录下来，存最小横坐标、最大横坐标、最小竖坐标、最大竖坐标
            if(grid[i][j]!=0){
                let a = grid[i][j];
                if(obj[a]){
                    // 如果已经记录过这个旗子，更新坐标
                    obj[a][0] = Math.min(obj[a][0],i);
                    obj[a][1] = Math.max(obj[a][1],i);
                    obj[a][2] = Math.min(obj[a][2],j);
                    obj[a][3] = Math.max(obj[a][3],j);
                }else{
                    obj[a] = [i,i,j,j];
                }
            }
        }
    }
    // console.log(obj);
    let areaList = [];
    for(let v in obj){
        let xy = obj[v];
        let area = (xy[1]-xy[0]+1)*(xy[3]-xy[2]+1);
        areaList.push(area);
    }
    return Math.max(...areaList);
}