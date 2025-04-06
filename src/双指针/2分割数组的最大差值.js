/*
题目描述
给定一个由若干整数组成的数组nums ，可以在数组内的任意位置进行分割，将该数组分割成两个非空子数组（即左数组和右数组），
分别对子数组求和得到两个值，计算这两个值的差值，请输出所有分割方案中，差值最大的值。

输入描述
第一行输入数组中元素个数n，1 < n ≤ 100000 第二行输入数字序列，以空格进行分隔，数字取值为4字节整数

输出描述
输出差值的最大取值

用例1
输入
6
1 -2 3 4 -9 7
输出
10
说明
将数组 nums 划分为两个非空数组的可行方案有:
左数组 = [1] 且 右数组 = [-2,3,4,-9,7]，和的差值 = | 1 - 3 | = 2
左数组 = [1,-2] 且 右数组 = [3,4,-9,7]，和的差值 = | -1 - 5 | =6
左数组 = [1,-2,3] 且 右数组 = [4,-9,7]，和的差值 = | 2 - 2 | = 0
左数组 = [1,-2,3,4] 且右数组=[-9,7]，和的差值 = | 6 - (-2) | = 8，
左数组 = [1,-2,3,4,-9] 且 右数组 = [7]，和的差值 = | -3 - 7| = 10最大的差值为10

输入
5
1 2 3 2 1
输出7
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(n,arr));
})()

// 思路：单指针 循环数组，记录差值，取最大即可
const getRes = (n,arr)=>{
    // 差值最小为0
    let res = 0;
    // 先计算出所有的和
    let sum = arr.reduce((a,b)=> a+b);
    let count = 0;
    // ！！！i从0到n-2,因为要把数组分为两个非空数组,所以i不能等于最后一个元素
    for(let i=0;i<n-1;i++){
        count += arr[i];
        // 一个和为count，另一个数组和为sum-count
        res = Math.max(res,Math.abs(sum-2*count));
    }
    return res;
}
