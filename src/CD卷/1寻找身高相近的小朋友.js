/*
题目描述
小明今年升学到小学一年级，来到新班级后发现其他小朋友们身高参差不齐，然后就想基于各小朋友和自己的身高差对他们进行排序，请帮他实现排序。

输入
第一行为正整数H和N，0<H<200，为小明的身高，0<N<50，为新班级其他小朋友个数。
第二行为N个正整数H1-HN，分别是其他小朋友的身高，取值范围0<Hi<200（1<=i<=N），且N个正整数各不相同。

输出
输出排序结果，各正整数以空格分割。和小明身高差绝对值最小的小朋友排在前面，和小明身高差绝对值最大的小朋友排在最后，
如果两个小朋友和小明身高差一样，则个子较小的小朋友排在前面。

示例1
输入
100 10
95 96 97 98 99 101 102 103 104 105
输出
99 101 98 102 97 103 96 104 95 105
说明
原文链接：https://blog.csdn.net/yegu001/article/details/135424713
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [h,n] = (await readline()).split(" ").map(Number);
    const list = (await readline()).split(" ").map(Number);
    console.log(getRes(h,n,list));
})()

// 思路：数组保存[身高差abs(v-h),身高v],排序身高差升序，身高升序
const getRes = (h,n,list)=>{
    let arr = [];
    for(let v of list){
        arr.push([Math.abs(v-h),v]);
    }
    // 身高差和身高都升序
    arr = arr.sort((a,b)=>a[0]==b[0]?a[1]-b[1]:a[0]-b[0]).map(v=>v[1]);
    return arr.join(" ");
}