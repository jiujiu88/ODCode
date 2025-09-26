/*
题目描述
给定一组闭区间，其中部分区间存在交集。
任意两个给定区间的交集，称为公共区间(如:[1,2],[2,3]的公共区间为[2,2],[3,5],[3,6]的公共区间为[3,5])
公共区间之间若存在交集，则需要合并(如:[1,3],[3,5]区间存在交集[3,3],需合并为[1,5])。按升序排列输出合并后的区间列表

输入描述
组区间列表
区间数为 N: O<=N<=1000。
区间元素为 X:-10000<=X<=10000。

输出描述
升序排列的合并区间列表
备注
1、区间元素均为数字，不考虑字母、符号等异常输入。
2、单个区间认定为无公共区间。

用例
输入
1 3 2 4 4 8 5 9
输出
2 3 4 4 5 8
说明
[1,3]、[2,4]、[4,8]、[5,9] 四个区间
[1,3]与[2,4]交集为[2,3]，[1,3]与[4,8]、[5,9]没有交集
[2,4]与[4,8]]交集为[4,4]。[2,4]与[5,9]没有交集
[4,8]与[5,9]的交集为[5,8]
所以最终的输出为[2,3]、[4,4]、[5,8]

输入
1 6 2 5 5 7
输出
2 6
说明
[1,6]、[2,5]的交集为[2,5]，[1,6]、[5,7]的交集为[5,6]
[2,5]、[5,7]的交集为[5,5]
最后的输出为：2 6

输入
1 2 3 4
输出
None
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    let arr = (await readline()).split(" ").map(Number);
    console.log(getRes(arr));
})();

const getRes = (arr)=>{
    let list = [];
    for(let i=0;i<arr.length;i+=2){
        list.push([arr[i],arr[i+1]]);
    }
    // 按照左端点升序
    list.sort((a,b)=>a[0]-b[0]);
    // console.log(list);
//     先暴力获取两两之间的交集
    const maxList = [];
    for(let i=0;i<list.length;i++){
        const [s1,e1] = list[i];
        for(let j=i+1;j<list.length;j++){
            const [s2,e2] = list[j];
            if(e1>=s2){
                // 因为按左端点排序了，因此s2一定大于等于s1，左端点直接取s2,右端点取小值
                maxList.push([s2,Math.min(e1,e2)]);
            }
        }
    }
    if(maxList.length===0){
        return "None";
    }
    maxList.sort((a,b)=>a[0]-b[0]);
    // maxList再进行合并区间
    const res = [];
    for(let [s,e] of maxList){
        if(res.length && res.at(-1)[1]>=s){
            res.at(-1)[1] = Math.max(res.at(-1)[1],e);
        }else{
            res.push([s,e]);
        }
    }
    // console.log(res);
    let ans = [];
    res.forEach(v=>ans.push(...v));
    return ans.join(" ");
}