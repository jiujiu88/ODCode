/*
题目描述
给定一个数组，我们称其中连续的元素为连续子序列，称这些元素的和为连续子序列的和。
数组中可能存在几组连续子序列，组内的连续子序列互不相交且有相同的和。
求一组连续子序列，组内子序列的数目最多。输出这个数目。

2输入描述
第一行输入为数组长度 N，1 ≤ N ≤ 10^3。
第二行为 N 个用空格分开的整数 Ci，-10^5 ≤ Ci ≤ 10^5。

3输出描述
第一行是一个整数 M，表示满足要求的最多的组内子序列的数目。

输入：
10
8 8 9 1 9 6 3 9 1 0
输出：
4
示例说明： 四个子序列第一个元素和最后一个元素下标分别为：
2 2
4 4
5 6
7 7

输入:
10
-1 0 4 -3 6 5 -6 5 -7 -3
输出:
3
说明:
三个子序列的第一个元素和最后一个元素的下标分别为：
3 3
5 8
9 9
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const n = parseInt(await readline());
    const list = (await readline()).split(" ").map(Number);
    console.log(getRes(n,list));
})();

const getRes = (n,list)=>{
    console.log(n,list);
//     计算前缀和
    let sumArr = [0];
    for(let i=0;i<n;i++){
        sumArr[i+1] = sumArr[i] + list[i];
    }
//    算出任意区间的子序列与他们的和 key为和 value为子序列索引数组
    let map = {};
    for(let i=0;i<n;i++){
        for(let j=i;j<n;j++){
            let sum = sumArr[j+1]-sumArr[i];
            if(!map[sum]){
                map[sum] = [];
            }
            map[sum].push([i,j]);
        }
    }
    // console.log(map);
    // 要找出互不相交的区间最多的组，返回互不相交的区间个数
    let res = 0;
    for(let range of Object.values(map)){
    //     先按照右端点排序
        range.sort((a,b) => a-b);
    //     计算x个区间中，有多少个互不相交的区间
        let right = -1;
        let cnt = 0;
        for(let [start,end] of range){
            if(start>right){
                cnt++;
                right = end;
            }
        }
        // console.log("不相交区间有：",cnt);
        res = Math.max(res,cnt);
    }
    return res;
}
