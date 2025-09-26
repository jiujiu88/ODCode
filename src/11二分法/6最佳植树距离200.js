/*
题目描述
按照环保公司要求，小明需要在沙化严重的地区进行植树防沙工作，初步目标是种植一条直线的树带。由于有些区域目前不适合种植树木，所以只能在一些可以种植的点来种植树木。

在树苗有限的情况下，要达到最佳效果，就要尽量散开种植，不同树苗之间的最小间距要尽量大。给你一个适合种情树木的点坐标和一个树苗的数量，请帮小明选择一个最佳的最小种植间距。

例如，适合种植树木的位置分别为1,3,5,6,7,10,13 树苗数量是3，种植位置在1,7,13，树苗之间的间距都是6，均匀分开，就达到了散开种植的目的，最佳的最小种植间距是6

输入描述
第1行表示适合种树的坐标数量

第2行是适合种树的坐标位置

第3行是树苗的数量

输出描述
最佳的最小种植间距

备注
位置范围为1~10000000
种植树苗的数量范围2~10000000
用例确保种桔的树苗数量不会超过有效种桔坐标数量
用例1
输入
7
1 5 3 6 10 7 13
3
输出
6
说明
3棵树苗分别种植在1，7，13位置时，树苗种植的最均匀，最小间距为6
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function (){
    const n = parseInt(await readline());
    const trees = (await readline()).split(" ").map(Number);
    const m = parseInt(await readline());
    console.log(getRes(n,trees,m));
}()

// 思路：二分法check，求最大间距target，check计算当满足>=target时，是否可以种完所有树，可以则表示这个间距ok。可以排序
const getRes = (n,trees,m)=>{
    // 树木种植位置升序排序，每个树苗向右找位置即可。
    trees.sort((a,b)=>a-b);
    // 间距最小为1，最大为max-min
    let left = 1,right = trees[n-1]-trees[0];
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        // 找更大的距离
        if(check(n,trees,m,mid)){
            left = mid + 1;
        }else{
            right = mid - 1;
        }
    }
    // 返回left-1 = right;
    return right;
}

// !!!计算间距>=target时，是否能把m个树苗种完
const check = (n,trees,m,target)=>{
    let start = 0;
    let count = 1;
    for(let i=1;i<n;i++){
        if(trees[i]-trees[start]>=target){
            start = i;
            count++;
        }
    }
    return count>=m;
}