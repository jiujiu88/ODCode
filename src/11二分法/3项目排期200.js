/*
题目描述
项目组共有 N 个开发人员，项目经理接到了 M 个独立的需求，每个需求的工作量不同，且每个需求只能由一个开发人员独立完成，不能多人合作。
假定各个需求直接无任何先后依赖关系，请设计算法帮助项目经理进行工作安排，使整个项目能用最少的时间交付。

输入描述
第一行输入为 M 个需求的工作量，单位为天，用逗号隔开。
例如：
X1 X2 X3 ... Xm
表示共有 M 个需求，每个需求的工作量分别为X1天，X2天，...，Xm天。其中：
0 < M < 30
0 < Xm < 200

第二行输入为项目组人员数量N
例如：
5
表示共有5名员工，其中 0 < N < 10

输出描述
最快完成所有工作的天数
例如：
25
表示最短需要25天完成所有工作

用例1
输入
6 2 7 7 9 3 2 1 3 11 4
2
输出
28
说明
共有两位员工，其中一位分配需求 6 2 7 7 3 2 1 共需要28天完成，另一位分配需求 9 3 11 4 共需要27天完成，故完成所有工作至少需要28天。

输入
4 1 7
2
输出
7

输入
3 8 9 6 4 9 9 8 6 8 7 1 2 8 1 6 1 9 6 7 2 5
8
输出
16

输入
1 5 1 1 1 4 9 1 5 7 4 1 5 6 2 1 8 8 7 1 6 4 6 3 3 3
3
输出
35
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const requirements = (await readline()).split(" ").map(Number);
    const k = parseInt(await readline());
    console.log(getRes(requirements,k))
}()


const getRes = (requirements,k)=>{
    // 回溯+二分
    let res = 0;
    const n = requirements.length;
    let sum = requirements.reduce((a, b) => a + b);
    let target = Math.ceil(sum/k);
//     降序，先放大的再放小的
    requirements.sort((a, b) => b - a);
    const dfs = (index,target,buckets)=>{
        // 装完了，返回true
        if(index===n){
            return true;
        }
        for(let i=0;i<k;i++){
            if(i>0 && buckets[i]==buckets[i-1]) continue;
            if(buckets[i]+requirements[index]>target) continue;
            buckets[i]+=requirements[index];
            if(dfs(index+1,target,buckets)) return true;
            buckets[i]-=requirements[index];
        }
        return false;
    }
//     二分 最快用耗时最长的需求时间，最慢用需求总和，一个人做
    let left = requirements[0],right = sum;
    while(left <= right){
        let mid = Math.floor((left + right) / 2);
        // 如果成功了，取更小的时间
        let buckets = Array(k).fill(0);
        if(mid*k>=sum && dfs(0,mid,buckets)){
            right = mid-1;
        }else{
            left = mid+1;
        }
    }
    return left;
}












// 思路: 二分法+集合回溯(桶装球,同698划分为k个相等的子集) 确定桶的数量k，不确定桶的容量，因此用二分法找桶的容量，检查桶的容量是否可以满足条件（球装完），找到最小的桶容量
const getRes = (requirements,k)=>{
    // ！ 排序 否则回溯容易超时 从大到小放球 降序
    requirements.sort((a,b)=>b-a);
    let res = 0;
    // 用二分法找桶的容量 最少最少需求的天数完成，最多所有需求加起来需要的时间
    let max = requirements.reduce((cur,sum)=>sum+cur);
    let left = requirements[0],right = max;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        // 入参：index装到第几个球了,mid为桶的容量
        // ！！！注意，每次用新的桶的容量，需要重新初始化桶，否则上个大容量也成功的话，桶内还装有球，会计算错误。
        const buckets = new Array(k).fill(0);
        // ！优化，如果桶容量*桶个数，总的容量小于所有需求天数，则不成立，加条件可减少回溯时间
        if(mid*k>=max && backtracking(buckets,requirements,k,0,mid)){
            res = mid;
            right = mid - 1;
        }else{
            left = mid + 1;
        }
    }
    return res;
}

const backtracking = (buckets,requirements,k,index,sum)=>{
    // 如果球都装完了，返回true
    if(index==requirements.length){
        return true;
    }
    // 循环桶
    for(let i=0;i<k;i++){
        // 减枝 如果上个桶的容量和这个桶一样，说明上一个已经装不下了才循环到这个，直接跳过,找下一个桶
        if(i>0 && buckets[i-1]==buckets[i]){
            continue;
        }
        // 如果装下这个球，超过容量了，则找下一个桶来装
        if(buckets[i]+requirements[index]>sum){
            continue;
        }
        // 将这个球装入桶中
        buckets[i] +=requirements[index];
        // 装下一个球了，index+1
        if(backtracking(buckets,requirements,k,index+1,sum)){
            return true;
        }
        // 回退
        buckets[i] -=requirements[index];
    }
    // ！ 如果完成不了，返回false
    return false;
}