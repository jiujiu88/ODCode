/*
题目描述
给定一个数组X和正整数K，请找出使表达式：

X[i] - X[i + 1] - ... - X[i + K - 1]

结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i.

其中，数组中位数：长度为N的数组，按照元素的值大小升序排列后，下标为 N/2 元素的值

备注
数组X的元素均为正整数
X的长度n取值范围：2 ≤ n ≤ 1000
K大于0目小于数组的大小
i 的取值范围: 0 ≤ i < 1000
题目的排序数组X[N]的中位数是X[N/2]
用例1
输入
[50,50,2,3],2
输出
1
说明
中位数为50：[50,50,2,3]升序排序后变成[2,3,50,50]，中位数为下标4/2=2的元素50

计算结果为1：X [50,50,2,3] 根据题目计算X[i] - ... - X[i + k - 1] 得出三个数0 (X[0] - X[1] = 50 - 50) 、48 (X[1] - X[2] = 50 - 2) 和 -1 (X[2]-X[3] = 2 - 3) ，其中48最接近50，因此返回下标1。
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：根据arr[i-1]与arr[i]的表达式差异，可以用arr[i-1]计算的结果用滑窗推出arr[i]的结果 ans-(x[i-1]-x[i]-x[i]+x[i+k-1])
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const line = await readline();
    const idx = line.lastIndexOf(",");
    const arr = JSON.parse(line.slice(0,idx));
    const k = parseInt(line.slice(idx+1));
    console.log(getRes(arr,k));
})()

const getRes = (arr,k)=>{
    // 滑窗
    const n = arr.length;
    let arr1 = [...arr].sort((a,b)=>a-b);
    // 计算中位数
    const target = arr1[Math.floor(n/2)];
    // 设置返回结果
    let res = 0;
    // i-1的表达式结果 x[i-1]-x[i]...-x[i+k-2] i的表达式结果x[i]-x[i+1]...-x[i+k-2]-x[i+k-1]
    // ！！！因此arr[i]可以表示为ans[i-1]-(x[i-1]-x[i]-x[i]+x[i+k-1])
    // 先计算i=0的结果，根据算式滑窗计算结果 let ans = arr[0]+arr[1]+...+arr[k-1]
    let ans = arr[0];
    for(let i=1;i<k;i++){
        ans -= arr[i];
    }
    // 记录i=0时的差值,作为最小差值的初始值
    let minDiff = Math.abs(ans-target);
    for(let i=1;i<arr.length;i++){
        ans -=(arr[i-1]-2*arr[i]+arr[i+k-1]);
        let diff = Math.abs(ans-target);
        if(diff<=minDiff){
            res = i;
            minDiff = diff;
        }
    }
    return res;
}