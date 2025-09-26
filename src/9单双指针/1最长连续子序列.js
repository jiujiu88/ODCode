/*
有N个正整数组成的一个序列。给定整数sum，求长度最长的连续子序列，使他们的和等于sum，返回此子序列的长度，
如果没有满足要求的序列，返回-1。
输入描述
第一行输入是：N个正整数组成的一个序列
第二行输入是：给定整数sum
输出描述
最长的连续子序列的长度
输入
1,2,3,4,2
6
输出	3
输入	1,2,3,4,2
20
输出	-1
输入
1,2,3,4,2
0
输出-1
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(",").map(Number);
    const target = parseInt(await readline());
    console.log(getRes(arr,target));
})()

// 思路：用滑动窗口，和超过target，left右移，直到sum<=target,sum=target,更新res
const getRes = (arr,target)=>{
    let res = -1;
    let sum = 0;
    let left = 0;
    for(let i=0;i<arr.length;i++){
        sum += arr[i];
        // ！！！必须限制left<i,否则可能left可能比i大，那么为0时得到res结果是不对的。
        // 用例1,2,3,4,2
        // 0
        while(left<i && sum>target){
            sum -= arr[left++];
        }
        if(sum==target){
            res = Math.max(res,i-left+1);
        }
    }
    return res;
}
        //     滑窗
        /* let left = 0;
         let sum = 0;
         for(let i=0;i<arr.length;i++){
             sum +=arr[i];
             while(left < i && sum>=target){
                 if(sum==target) {
                     res = Math.max(res,i-left+1);
                 }
                 sum -=arr[left];
                 left++;
             }
         }*/
        // 前缀和
        /*let sumArr = new Array(arr.length+1).fill(0);
        for(let i=1;i<=arr.length;i++){
            sumArr[i] = sumArr[i-1]+arr[i];
        }
        // 两个循环,获取和
        // 0 1 3 6 10 12
        for(let i=0;i<arr.length-1;i++){
            for(let j=i+1;i<arr.length;i++) {
                if(sumArr[j]-sumArr[i]==target){
                    res = Math.max(res,j-i);
                }
            }
        }*/
