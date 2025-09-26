/*
题目描述
为了提升软件编码能力，小王制定了刷题计划，他选了题库中的n道题，编号从0到n-1，并计划在m天内按照题目编号顺序刷完所有的题目（注意，小王不能用多天完成同一题）。

在小王刷题计划中，小王需要用tme[i]的时间完成编号 i 的题目。

此外，小王还可以查看答案，可以省去该题的做题时间。为了真正达到刷题效果，小王每天最多直接看一次答案。

我们定义m天中做题时间最多的一天耗时为T（直接看答案的题目不计入做题总时间)。

请你帮小王求出最小的T是多少。

输入描述
第一行输入为time，time[i]的时间完成编号 i 的题目

第二行输入为m，m表示几天内完成所有题目，1 ≤ m ≤ 180

输出描述
最小耗时整数T

用例1
输入
999,999,999
4
输出
0
说明
在前三天中，小王每天都直接看答案，这样他可以在三天内完成所有的题目并不花任何时间

用例2
输入
1,2,2,3,5,4,6,7,8
5
输出
4
说明
第一天完成前3题，第3题看答案; 第二天完成第4题和第5题，第5题看答案； 第三天完成第6和第7题，第7提看答案; 第四天完成第8题，直接看答案: 第五天完成第9题，直接看答案
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function (){
    const time = (await readline()).split(",").map(Number);
    const m = parseInt(await readline());
    console.log(getRes(time,m));
}()

// 思路：二分法check，默认每天都看答案，这样结果最小。!!!T最小为0，最大为一天内做完题目，sum(time)-max(time)。二分check是否满足条件，找最小
const getRes = (time,m)=>{
    // 如果题目数量比m少，表示可以每天看答案，耗时为0
    if(time.length<=m){
        return 0;
    }
    // 正常做题，用二分计算一天的耗时，看是否满足条件  按顺序做题，不要排序
    const sum = time.reduce((a,b)=>a+b);
    let left = 0,right = sum-Math.max(...time);
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        // 满足条件求更小，因此是移动右指针使结果更小
        if(check(time,m,mid)){
            right = mid - 1;
        }else{
            left = mid + 1;
        }
    }
    // 结果是mid = right + 1 = left;
    return left;
}

// 默认每天看答案，每天最多耗时为target，即花费时间<=target，看是否能在m天做完题目
const check = (time,m,target)=>{
    let days = 0;
    let max = 0;
    let sum = 0;
    for(let i=0;i<time.length;i++){
        sum +=time[i];
        max = Math.max(max,time[i]);
        // 如果花费时间超过target了，表示上一个time是合适的
        if(sum-max>target){
            days++;
            // 重置下一天耗时
            max = time[i];
            sum = time[i];
            // 如果是最后一天了，直接看答案可以做完，但是要花费一天
            if(i==time.length-1){
                days++;
            }
        }else{
            // 如果是最后一天了，且花费时间没超过，算一天
            if(i==time.length-1){
                days++;
            }
        }
    }
    return days<=m;
}