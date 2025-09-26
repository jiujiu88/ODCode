/*
在星球争霸篮球赛对抗赛中，最大的宇宙战队希望每个人都能拿到 MVP，MVP 的条件是单场最高分得分获得者。
可以并列所以宇宙战队决定在比赛中尽可能让更多队员上场，并且让所有得分的选手得分都相同，然而比赛过程中的每一分钟的得分都只能由某一个人包揽。
输入描述
输入第一行为一个数字 t ，表示为有得分的分钟数
1 ≤ t ≤ 50
第二行为 t 个数字，代表每一分钟的得分 p
1 ≤ p ≤ 50
输出描述
输出有得分的队员都是 MVP 时，最少得 MVP 得分。
输入
9
5 2 1 5 2 1 5 2 1
输出	6
说明	样例解释 一共 4 人得分，分别都是 6 分
5 + 1 ， 5 + 1 ， 5 + 1 ， 2 + 2 + 2
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
let lines = [];
rl.on("line",line=> {
    lines.push(line);
    if (lines.length == 2) {
        // 找最小的总和,即最大的k值   最小为1,最大为n
        let n = parseInt(lines[0]);
        let nums = lines[1].split(" ").map(Number);
        console.log(getRes(nums,n));
        lines.length = 0;
    }
})

function getRes(nums,n){
    let sum = nums.sort((a,b)=>b-a).reduce((a,b)=>a+b);
    while(n>0){
        if(getMVP(n,nums,sum)){
            return sum/n;
        }else{
            n--;
        }
    }
}

function getMVP(n,nums,sum){
    // 不能平分 或者没法平分也不行
    if(sum%n!=0 || nums[0]>sum/n) return false;
    let buckets = new Array(n).fill(0);
    let target = sum/n;
    return getSolution(0,nums,buckets,target,n);
}

// 9
// 5 2 1 5 2 1 5 2 1
//  4个人  6分
function getSolution(index,nums,buckets,target){
    if(index==nums.length){
        return true;
    }
    for(let i=0;i<buckets.length;i++){
        if(buckets[i] +nums[index] >target) continue;
        // 去重
        if(i>0 && buckets[i]==buckets[i-1]) continue;
        buckets[i] += nums[index];
        if(getSolution(index+1,nums,buckets,target)) return true;
        buckets[i] -=nums[index];
    }
    return false;
}

