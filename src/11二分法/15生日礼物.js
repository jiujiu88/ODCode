/*
问题描述
小牛计划为孩子购买一个蛋糕和一个小礼物，预算不超过x元。蛋糕和小礼物都有多种价位可供选择。要求计算小牛共有多少种购买方案。

输入描述
第一行表示蛋糕的单价，以逗号分隔。
第二行表示小礼物的单价，以逗号分隔。
第三行表示预算x。

输出描述
输出数字表示购买方案的总数

备注
1 ≤ cake.length ≤ 10^5
1 ≤ gift.length ≤10^5
1 ≤ cake[i]，gift[i] ≤ 10^5
1 ≤ X ≤ 2*10^5

用例
输入
10,20,5
5,5,2
15
输出	6

输入
[10,20,5]
[5,5,2]
15
输出6
*/

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    // ！！有输入为[10,20,5][5,5,2]15，结果也是6，需要格式化
    const cakes = (await readline()).replaceAll("[","").replaceAll("]","").split(",").map(Number);
    const gifts = (await readline()).replaceAll("[","").replaceAll("]","").split(",").map(Number);
    const x = parseInt(await readline());
    console.log(getRes(cakes,gifts,x))
}()

// 思路:二分法查询插入位置+排序，排序后快速查找位置，记录方案数
const getRes = (cakes,gifts,x)=>{
    let sum = 0;
    cakes.sort((a,b)=>a-b);
    gifts.sort((a,b)=>a-b);
    for(let cake of cakes){
        if(x>cake){
            // ！！由于要找数组中最后一个的位置，因此将target+1,这样找到的就是靠后的 例如[3,3,3,4,5]找3最后插入的位置，找到>=4的下标就是3，实际就是符合要求的个数
            let idx = binarySearch(gifts,x-cake+1);
            sum += idx;
        }
    }
    return sum;
}

// 记录剩余的钱可以安排到礼物的哪个位置，表示礼物0-idx的都可以买
const binarySearch = (gifts,target)=>{
    let left = 0,right = gifts.length-1;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(gifts[mid]>=target){
            right = mid -1;
        }else{
            left = mid + 1;
        }
    }
    return left;
}
