/*
题目：
一条笔直的公路上安装了N个路灯，从位置0开始安装，路灯之间的距离是100m。每个路灯都有自己的照明半径，请计算第一个路灯和最后一个路灯之间，未照明区间的长度和。

输入描述：
第一行为一个数N，表示灯的个数，[1, 100000]
第二行为N个空格分隔的数，表示路灯的照明半径，[1,100*100000]
输出描述：
第一个路灯和最后一个路灯之间，未照明区间的长度和

举例：
输入：
2
50 50
输出：
0

输入：
4
50 70 20 70
输出：
20

输入：
8
10 10 10 250 10 10 10 10
输出：
160
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const n = parseInt(await readline());
    let arr = (await readline()).split(" ").map(Number);
    console.log(getRes(n,arr));
})();

// 思路：先算出每个区间，然后合并，合并时记录区间间隔的值
const getRes = (n,arr)=>{
    let res = 0;
    let list = [];
    // 记录区间
    for(let i=0;i<n;i++){
        list.push([i*100-arr[i],i*100+arr[i]]);
    }
    console.log(list);
    // list一定要排序
    list.sort((a,b)=>a[0]-b[0]);
    // 合并区间
    let stack = [];
    for(let i=0;i<n;i++){
        if(stack.length && stack.at(-1)[1]>=list[i][0]){
            stack[stack.length-1][1] = Math.max(stack.at(-1)[1],list[i][1]);
        }else{
            if(i!=0){
                res += list[i][0] - stack.at(-1)[1];
            }
            stack.push(list[i]);
        }
    }
    console.log(stack)
    return res;
}

// 思路：有可能有的路灯可以覆盖前面的路灯空间，因此先计算空间，再对空间排序，没有交集的区间计算长度
const getRes1 = (n,arr)=>{
    let res = 0;
    let ranges = [];
    for(let i=0;i<n;i++){
        ranges.push([i*100-arr[i],i*100+arr[i]]);
    }
//     按照左端点升序
    ranges.sort((a,b)=>a[0]-b[0]);
    let right = 0;
    for(let i=0;i<n;i++){
        // 如果有交集，不断更新右端点
        if(ranges[i][0]<=right){
            right = Math.max(right,ranges[i][1]);
        }else{
        //     没有交集，计算间隙
            res +=ranges[i][0]-right;
            right = ranges[i][1];
        }
    }
    return res;
}

// 报错 失分点：用例10 10 10 250 10 10 10 10，中间某一个路灯可以覆盖掉其他区间，因此以下算法有误
const getRes2 = (n,arr)=>{
//     路灯之间 没有照到的加起来
    let end = arr[0];
    let res = 0;
    for(let i=1;i<n;i++){
        if(arr[i]+end<100){
            res +=100-arr[i]-end;
        }
        end = arr[i];
    }
    return res;
}