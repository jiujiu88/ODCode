/*
题目描述
给定一个含有N个正整数的数组, 求出有多少个连续区间（包括单个正整数）, 它们的和大于等于x。

输入描述
第一行两个整数N x（0 < N <= 100000, 0 <= x <= 10000000)

第二行有N个正整数（每个正整数小于等于100)。

输出描述
输出一个整数，表示所求的个数。

注意：此题对效率有要求，暴力解法通过率不高，请考虑高效的实现方式。

用例1
输入
3 7
3 4 7
输出
4
说明
第一行的3表示第二行数组输入3个数，第一行的7是比较数，用于判断连续数组是否大于该数；组合为 3 + 4; 3 + 4 + 7; 4 + 7; 7; 都大于等于指定的7；所以共四组。

用例2
输入
10 10000
1 2 3 4 5 6 7 8 9 10
输出
0
说明
所有元素的和小于10000，所以返回0。
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：求子数组个数，越长越合法，res+=left;循环数组，只要和大于等于x就缩小窗口，记录个数
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [n,x] = (await readline()).split(" ").map(Number);
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(n,x,arr));
})()

const getRes = (n,x,arr)=>{
    // 滑窗
    let res = 0;
    let sum = 0;
    let left = 0;
    for(let i=0;i<arr.length;i++){
        sum +=arr[i];
        //     ！！！ 注意，计算和是，x=0会left=i
        // 窗口缩小时，如果x=0，left可能等于right，为了避免left比right大，加限制条件left<=i
        while(left<=i && sum>=x){
            sum -=arr[left++];
        }
        // 记录结果 右端点固定，左端点在下标为0，1~left-1时都符合要求，有left个
        res +=left;
    }
    return res;
}