/*
题目描述
有一个N个整数的数组，和一个长度为M的窗口，窗口从数组内的第一个数开始滑动直到窗口不能滑动为止，
每次窗口滑动产生一个窗口和（窗口内所有数的和），求窗口滑动产生的所有窗口和的最大值。

输入描述
第一行输入一个正整数N，表示整数个数。（0<N<100000）
第二行输入N个整数，整数的取值范围为[-100,100]。
第三行输入一个正整数M，M代表窗口的大小，M<=100000，且M<=N。
输出描述
窗口滑动产生所有窗口和的最大值。
用例1
输入
6
10 20 30 15 23 12
3
输出
68
说明
窗口长度为3，窗口滑动产生的窗口和分别为
10+20+30=60，
20+30+15=65，
30+15+23=68，
15+23+12=50，
所以窗口滑动产生的所有窗口和的最大值为68。
输入
64
-24 -41 -16 100 -48 2 76 90 -26 -93 16 92 16 -15 18 50 79 -58 67 9 -8 73 67 -10 84 -53 -82 44 -87 79 15 13 16 28 -82 0 54 94 74 14 17 70 87 -92 4 -96 85 36 -48 -43 -11 10 -53 -91 -83 -25 73 8 -16 -58 -32 -31 -84 68
13
输出406
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：找到出现次数相同字符的子串，用滑窗获取固定长度的子串，判断是否是word的子串
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const arr = (await readline()).split(" ").map(Number);
    const k = parseInt(await readline());
    console.log(getRes(n,arr,k));
})()

const getRes = (n,arr,k)=>{
    // ！！！由于和可能是负数，初始化为-Infinity
    let res = -Infinity;
    let sum = 0;
    for(let i=0;i<arr.length;i++){
        sum+=arr[i];
        if(i+1<k){
            continue;
        }
        res = Math.max(res,sum);
        sum-=arr[i-k+1];
    }
    return res;
}