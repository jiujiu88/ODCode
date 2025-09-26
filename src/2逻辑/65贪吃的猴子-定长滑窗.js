/*
题目描述：
一只贪吃的猴子，来到一个果园，发现许多串香蕉排成一行，每串香蕉上有若干根香蕉。
每串香蕉的根数由数组numbers给出。猴子获取香蕉，每次都只能从行的开头或者未尾获取，并且只能获取N次，求猴子最多能获取多少根香蕉。

二、输入输出
输入描述：
第一行为数组numbers的长度
第二行为数组numbers的值每个数字通过空格分开
第三行输入为N，表示获取的次数
输出描述：
按照题目要求能获取的最大数值

三、示例
示例1：
输入：
7
1 2 2 7 3 6 1
3
输出：
10
示例2：
输入：
3
1 2 3
3
输出：
6
说明:全部获取所有的香蕉，因此最终根数为1+2+3 = 6
示例3：
输入：
4
4 2 2 3
2
输出：
7
说明：第一次获取香蕉为行的开头，第二次获取为行的末尾，因此最终根数为4+3 =7
原文链接：https://blog.csdn.net/u014481728/article/details/135890379
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const list = (await readline()).split(" ").map(Number);
    const count = parseInt(await readline());
    console.log(getRes1(n,list,count));
})()

// 思路：前缀和 猴子取左边的连续left个，右边的连续right个，left+right = count.
const getRes = (n,list,count)=>{
    // console.log(n,list,count);
    let res = 0;
    // 分别计算左边的前count个，右边的前count个
    let preSum = Array(count+1).fill(0);
    let sufSum = Array(count+1).fill(0);
    for(let i=0;i<count;i++){
        preSum[i+1] = preSum[i]+list[i];
        sufSum[i+1] = sufSum[i]+list[n-1-i];
    }
    for(let i=0;i<=count;i++){
    //     如果i是左边拿的，count-i是右边拿的，计算最大值
        let sum = preSum[i]+sufSum[count-i];
        // console.log(sum)
        res = Math.max(res,sum);
    }
    return res;
}

// 思路2：滑动窗口  反向计算，其实就是取连续数组，n-count个，和最小，这样剩下的猴子取，就是最大。
const getRes1 = (n,list,count)=>{
    // console.log(n,list,count);
    let allSum = list.reduce((sum,v)=>sum+v);
    // 计算长度为k的滑窗的最小值
    let k = n-count;
    // 如果猴子取所有的，直接返回总和
    if(k===0) return allSum;
    // 固定长度滑窗 入-更新-出
    let max = Infinity;
    let sum = 0;
    for(let i=0;i<n;i++){
        sum +=list[i];
        if(i+1<k) continue;
        max = Math.min(max,sum);
        sum -= list[i+1-k];
    }
    return allSum-max;
}