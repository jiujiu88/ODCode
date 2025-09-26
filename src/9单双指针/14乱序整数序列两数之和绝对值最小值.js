/*
题目描述
给定一个随机的整数（可能存在正整数和负整数）数组 nums，请你在该数组中找出两个数，
其和的绝对值(​|nums[x]+nums[y]|​)为最小值，并返回这个两个数（按从小到大返回）以及绝对值。

每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

输入描述
一个通过空格分割的有序整数序列字符串，最多1000个整数，且整数数值范围是 [-65535, 65535]。

输出描述
两数之和绝对值最小值

用例1
输入
-1 -3 7 5 11 15
输出
-3 5 2
说明
因为 |nums[0] + nums[2]| = |-3 + 5| = 2 最小，所以返回 -3 5 2。

输入
31820 -21112 23077 11799 -17257 -32853 -33594 -10246 32779 -5049 40832 22398 -9891 -2690 33683 12628 -64246 50480 37490 -24089 -45209 -62719 36741 47156 -60451
输出-32853
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(arr));
})()

// 思路：暴力破解 双循环
const getRes1 = (arr)=>{
    let sum = 0;
    let min = Infinity;
    let res = "";
    for(let i = 0;i < arr.length-1;i++){
        for(let j = i + 1;j < arr.length;j++){
            sum = Math.abs(arr[i] + arr[j]);
            if(sum < min){
                min = sum;
                if(arr[i]<arr[j]){
                    res = [arr[i],arr[j],min].join(" ");
                }else{
                    res = [arr[j],arr[i],min].join(" ");
                }
            }
        }
    }
    return res;
}

//思路：优化 双指针+二分法 先用二分法找到0所在的下标
const getRes = (arr)=>{
    let res = [];
    let n = arr.length;
    // 升序排序
    arr.sort((a,b)=>a-b);
    // 找到0所在的下标
    let index = binarySearch(arr,0);
    if(index == n){
    //     都是负数 取绝对值最大的两个数
        res = [arr[n-2],arr[n-1],Math.abs(arr[n-1] + arr[n-2])];
    }else if(index == 0){
    //     都是正数 取绝对值最小的两个数
        res = [arr[0],arr[1],Math.abs(arr[0] + arr[1])];
    }else{
            let min = Infinity;
    //     正负都有  循环前面负数部分，取元素为x，求-x在数组中的索引位置j，取索引前后的下标j-1、j，分别加上x，就是这个数最小的和，循环后取最小值
            for(let i = 0;i <index;i++){
                let x = arr[i];
                let j = binarySearch(arr,-x);
                // 如果j的下标是数组长度，则取最后一个数即可
                if(j==n){
                    j--;
                }
                // 先计算j的值
                let sum = Math.abs(x + arr[j]);
                if(sum<min){
                    min = sum;
                    res = [x,arr[j],sum];
                }
                // 如果j-1的下标存在，则计算该值
                if(j-1>=0){
                    let sum = Math.abs(x + arr[j-1]);
                    if(sum<min){
                        min = sum;
                        res = [x,arr[j-1],sum];
                    }
                }
            }
    }
    return res.join(" ");
}

const binarySearch = (arr,target)=>{
    let left = 0,right = arr.length-1;
    while(left <= right){
        let mid = Math.floor((left + right)/2);
        if(arr[mid] >= target){
            right = mid - 1;
        }else if(arr[mid] < target){
            left = mid + 1;
        }
    }
    return left;
}