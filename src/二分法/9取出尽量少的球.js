/*
题目描述
某部门开展 Family Day 开放日活动，其中有个从桶里取球的游戏，游戏规则如下：

有 N 个容量一样的小桶等距排开，且每个小桶都默认装了数量不等的小球，每个小桶装的小球数量记录在数组 bucketBallNums 中，

游戏开始时，要求所有桶的小球总数不能超过 SUM，如果小球总数超过 SUM，则需对所有的小桶统一设置一个容量最大值 maxCapacity，并需将超过容量最大值的小球拿出来，直至小桶里的小球数量小于 maxCapacity。

请您根据输入的数据，计算从每个小桶里拿出的小球数量？

限制规则一：所有小桶的小球总和小于 SUM，则无需设置容量值 maxCapacity，并且无需从小桶中拿球出来，返回结果 []
限制规则二：如果所有小桶的小球总和大于 SUM，则需设置容量最大值 maxCapacity，并且需从小桶中拿球出来，返回从每个小桶拿出的小球数量组成的数组
输入描述
第一行输入 2 个正整数，数字之间使用空格隔开，其中：

第一个数字表示 SUM
第二个数字表示 bucketBallNums 数组长度
第二行输入 N 个正整数，数字之间使用空格隔开，表示 bucketBallNums 的每一项

输出描述
从每个小桶里拿出的小球数量，并使用一维数组表示

备注
1 ≤ bucketBallNums[i] ≤ 10^9
1 ≤ bucketBallNums.length = N ≤ 10^5
1 ≤ maxCapacity ≤ 10^9
1 ≤ SUM ≤ 10^9
用例1
输入
14 7
2 3 2 5 5 1 4
输出
[0,1,0,3,3,0,2]
说明
小球总数为 22， SUM = 14，超出范围了，需从小桶取球，

maxCapacity = 1，取出球后，桶里剩余小球总和为 7，远小于 14

maxCapacity = 2，取出球后，桶里剩余小球总和为 13，

maxCapacity = 3，取出球后，桶里剩余小球总和为 16，大于 14

因此 maxCapacity 为 2 ，每个小桶小球数量大于 2 的都需要拿出来；

用例2
输入
3 3
1 2 3
输出
[0,1,2]
说明
小球总数为 6，SUM = 3，超出范围了，需从小桶中取球，maxCapacity = 1，则小球总数为 3，从 1 号桶取 0 个球，2 号桶取 1 个球，3 号桶取 2 个球；

用例3
输入
6 2
3 2
输出
[]
说明
小球总数为 5，SUM = 6，在范围内，无需从小桶取球；
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const [sum,n] = (await readline()).split(" ").map(Number);
    const requirements = (await readline()).split(" ").map(Number);
    console.log(getRes(sum,n,requirements))
}()

// 思路: 二分法
const getRes = (sum,n,requirements)=>{
    let count = requirements.reduce((a,b)=>a+b);
    // 所有小桶的小球总和小于 SUM，则无需设置容量值 maxCapacity
    if(count<=sum){
        return [];
    }
    // 记录最后分出去的需求数量
    let res = [];
    // maxCapacity最少为0，最多为max
    let left = 0,right = Math.max(...requirements);
    while(left<=right){
        let mid = Math.floor((left+right)/2);
    //     求更大：要剩余的球越多越好（分出去的比较少）。求mid越大越好
        if(check(sum,n,requirements,mid)){
            left = mid +1;
        }else{
            right = mid -1;
        }
    }
    // right的结果是限额，最后计算分出去的需求
    for(let v of requirements){
        // 如果超出份额，分出v-target个需求，否则分出0个需求
        res.push(v>right?v-right:0);
    }
    return res;
}

// 判断限额为target时，剩下的需求是否<=sum
const check = (sum,n,requirements,target)=>{
    let count = 0;
    for(let v of requirements){
        // 如果超出份额，剩下target个需求，否则剩下v个需求
        count +=v>target?target:v
    }
    // 如果剩下需求和<=sum，表示符合要求
    return count <= sum;
}