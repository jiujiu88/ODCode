/*
题目描述
部门在进行需求开发时需要进行人力安排。

当前部门需要完成 N 个需求，需求用 requirements 表述，requirements[i] 表示第 i 个需求的工作量大小，单位：人月。

这部分需求需要在 M 个月内完成开发，进行人力安排后每个月人力时固定的。

目前要求每个月最多有2个需求开发，并且每个月需要完成的需求不能超过部门人力。

请帮助部门评估在满足需求开发进度的情况下，每个月需要的最小人力是多少？

输入描述
输入为 M 和 requirements，M 表示需求开发时间要求，requirements 表示每个需求工作量大小，N 为 requirements长度，

1 ≤ N/2 ≤ M ≤ N ≤ 10000
1 ≤ requirements[i] ≤ 10^9
输出描述
对于每一组测试数据，输出部门需要人力需求，行末无多余的空格

用例1
输入
3
3 5 3 4
输出
6
说明
输入数据两行，

第一行输入数据3表示开发时间要求，

第二行输入数据表示需求工作量大小，

输出数据一行，表示部门人力需求。

当选择人力为6时，2个需求量为3的工作可以在1个月里完成，其他2个工作各需要1个月完成。可以在3个月内完成所有需求。

当选择人力为5时，4个工作各需要1个月完成，一共需要4个月才能完成所有需求。

因此6是部门最小的人力需求。
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const m = parseInt(await readline());
    const requirements = (await readline()).split(" ").map(Number);
    console.log(getRes(m,requirements))
}()

// 思路: 二分法+check双指针  二分法找合适的target人力要求，check判断完成的时间是否在m个月内。
const getRes = (m,requirements)=> {
//     需求降序排序
    requirements.sort((a,b)=>b-a);
//     最少人力是最大的需求需要的人天max 最多人力是在1天内完成所有需求
    let sum = requirements.reduce((a,b)=>a+b);
    let left = Math.max(...requirements),right = sum;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        // 找更小
        if(check(m,requirements,mid)){
            right = mid - 1;
        }else{
            left = mid + 1;
        }
    }
    return left;
}

// 判断在target人力要求下，看完成所有需求需要多少天，每个月可以完成一个或2个需求 双指针 每次如果最大的+最小的<=target，那么就做2个需求，否则就做一个大需求
const check = (m,requirements,target)=>{
    let count = 0;
    let left = 0,right = requirements.length-1;
    while(left<=right){
        // 如果还可以加一个最小的，那么就做2个需求
        if(left<right && requirements[left] + requirements[right]<=target){
            right--;
        }
        count++;
        left++;
    }
    // 如果需要的天数小于等于m，表示可以做完
    return count<=m;
}