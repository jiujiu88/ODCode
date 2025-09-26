/*
题目描述
A公司准备对他下面的N个产品评选最差奖， 评选的方式是首先对每个产品进行评分，然后根据评分区间计算相邻几个产品中最差的产品。
评选的标准是依次找到从当前产品开始前M个产品中最差的产品，请给出最差产品的评分序列。

输入描述
第一行，数字M，表示评分区间的长度，取值范围是0<M<10000
第二行，产品的评分序列，比如[12,3,8,6,5]，产品数量N范围是-10000 < N <10000

输出描述
评分区间内最差产品的评分序列

用例1
输入
3
12,3,8,6,5
输出
3,3,5
说明
12,3,8 最差的是3
3,8,6 最差的是3
8,6,5 最差的是5

输入
9
-77,9,-8,-40,-8,-51,-64,55,-54,-21,55,97,-90,-54,-29,26,78,-4,85,-15,-38,92,89,99,-15,-59,-34,1,-2,-60,50,-96,6,79,14,-100,47
输出-77,-64,-64,-64,...。
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const m = parseInt(await readline());
    const arr = (await readline()).split(",").map(Number);
    console.log(getRes1(m,arr));
})()

// 思路1：计算长度为m的滑动窗口的最小值--暴力解法，用数组
const getRes = (m,arr)=>{
    let res = [];
    let arr1 = [];
    for(let i=0;i<arr.length;i++){
        arr1.push(arr[i]);
        if(i+1<m){
            continue;
        }
        res.push(Math.min(...arr1));
        arr1.shift();
    }
    return res.join(',');
}

// 思路2：计算长度为m的滑动窗口的最小值--暴力解法，用slice获取子数组
const getRes1 = (m,arr)=>{
    let res = [];
    for(let i=0;i<=arr.length-m;i++){
        res.push(Math.min(...arr.slice(i,i+m)));
    }
    return res.join(',');
}

//思路3，单调队列，记录最小值队列，arr[0]为最小值
const getRes2 = (m,arr)=>{
    let res = [];
    let minArr = [];
    for(let i=0;i<arr.length;i++){
        // !!!用while 如果队列最后的值比当前值大，则弹出
        while(minArr.length && minArr[minArr.length-1]>arr[i]){
            minArr.pop();
        }
        minArr.push(arr[i]);
        if(i+1<m) continue;
        // 记录结果
        res.push(minArr[0]);
    //     出arr[i+1-m]，如果出的值是最小值，则从开头删除该值
        if(minArr[0]==arr[i+1-m]){
            minArr.shift();
        }
    }
    return res.join(",");
}
