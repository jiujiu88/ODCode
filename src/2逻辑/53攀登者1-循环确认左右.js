/*
一、题目描述
攀登者喜欢寻找各种地图，并且尝试攀登到最高的山峰。
地图表示为一维数组，数组的索引代表水平位置，数组的元素代表相对海拔高度。其中数组元素0代表地面。
例如：[0,1,2,4,3,1,0,0,1,2,3,1,2,1,0]，代表如下图所示的地图，
地图中有两个山脉位置分别为 1,2,3,4,5 和 8,9,10,11,12,13，最高峰高度分别为 4,3。最高峰位置分别为3,10。

一个山脉可能有多座山峰(高度大于相邻位置的高度，或在地图边界且高度大于相邻的高度)。

二、输入描述
输入为一个整型数组，数组长度大于1。

三、输出描述
输出地图中山峰的数量。
输入
0,1,2,4,3,1,0,0,1,2,3,1,2,1,0
输出
2
原文链接：https://blog.csdn.net/guorui_java/article/details/137521154
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const mountain = (await readline()).split(",").map(Number);
    console.log(getRes(mountain));
})()

// 思路：同找座位，找到左右的高度(边界则为0)，如果当前高度大于左右，结果+1
const getRes = (mountain)=>{
    console.log(mountain);
    let res = 0;
    for(let i=0;i<mountain.length;i++){
        let left = i<=0 ? 0 : mountain[i-1];
        let right = i>=mountain.length-1 ? 0 : mountain[i+1];
        if(mountain[i]>left && mountain[i]>right){
            res++;
        }
    }
    return res;
}