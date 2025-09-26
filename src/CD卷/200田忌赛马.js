/*
题目描述
给定两个只包含数字的数组a, b, 调整数组a里面数字的顺序，使得尽可能多的a[i] > b[i]。数组a和b中的数字各不相同。
输出所有可以达到最优结果的a数组数量

输入
输入的第一行是数组a中的数字，其中只包含数字，每两个数字之间相隔一个空格，a数组大小不超过10
输入的第一行是数组b中的数字，其中只包含数字，每两个数字之间相隔一个空格，b数组大小不超过10

输出
输出所有可以达到最优结果的a数组数量

示例1
输入
11 8 20
10 13 7
输出
1

说明
最优结果只有一个，a = [11, 20, 8]，故输出1

示例2
输入
11 12 20
10 13 7

输出
2
说明
有两个a数组的排列可以达到最优结果，[12, 20, 11]和[11, 20, 12]，故输出2

示例3
输入
1 2 3
4 5 6
输出
6
说明
a无论如何都会全输，故a任意排列都行，输出所有a数组的排列，6种排法
原文链接：https://blog.csdn.net/weixin_44940604/article/details/141195602
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const a = (await readline()).split(" ").map(Number);
    const b = (await readline()).split(" ").map(Number);
    console.log(getRes(a,b));
})()

// 思路:回溯算法  参考全排列,如果所有的a[i]>b[path.length],则符合条件,加入path.计算所有方法数.如果怎样都无法符合,返回n的阶乘
const getRes = (a,b)=>{
    // console.log(a,b);
    const n = a.length;
    const used = Array(n).fill(false);
    let res = 0;
    let path = [];
    const dfs = (a,b,used)=>{
        // 如果符合条件的path拼接完成,则res+1
        if(path.length==n){
            res++;
        }
        for(let i=0; i<n; i++){
            // 当选择时,例如path长度为len,此时就要和b[len]比较,如果选择a[i]比b[len]大且没用过,就符合条件,加入path
            if(used[i] || a[i]<=b[path.length]) continue;
            path.push(a[i]);
            used[i]=true;
            dfs(a,b,used);
            path.pop();
            used[i]=false;
        }
    }
    dfs(a,b,used);
    // 如果任意情况都不能使结果满足,那么输出所有a的排列情况,即n的阶乘
    if(res!==0){
        return res;
    }else{
    //     计算n的阶乘
        let num = n;
        let ans = num;
        while(num>1){
            num--;
            ans *=num;
        }
        return ans;
    }
}