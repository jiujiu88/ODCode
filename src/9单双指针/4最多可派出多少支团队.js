/*
题目描述
用数组代表每个人的能力，一个比赛活动要求参赛团队的最低能力值为N，每个团队可以由1人或者2人组成，且1个人只能参加1个团队，计算出最多可以派出多少只符合要求的团队。

输入描述
第一行代表总人数，范围1-500000
第二行数组代表每个人的能力
数组大小，范围1-500000
元素取值，范围1-500000
第三行数值为团队要求的最低能力值，范围1-500000
输出描述
最多可以派出的团队数量

用例1
输入
5
3 1 5 7 9
8
输出
3
说明
说明 3、5组成一队 1、7一队 9自己一队 输出3

用例2
输入
7
3 1 5 7 9 2 6
8
输出
4
说明
3、5组成一队，1、7一队，9自己一队，2、6一队，输出4

用例3
输入
3
1 1 9
8
输出
1
说明
9自己一队，输出1
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const m = parseInt(await readline());
    const arr = (await readline()).split(" ").map(Number);
    const n = parseInt(await readline());
    console.log(getRes(m,arr,n));
})()


// 由于限制了每个队最多2人，因此可以用双指针，左右取
const getRes = (m,arr,n)=> {
    // 先降序排序
    arr.sort((a, b) => a - b);
    let left = 0,right = m-1;
    let count = 0;
    while (left < right) {
        let sum = arr[right];
        if (sum >= n) {
            right--;
            count++;
        } else {
            sum += arr[left];
            if (sum >= n) {
                left++;
                right--;
                count++;
            }else{
                left++;
            }
        }
    }
    return count;
}

// 思路：降序排序，能力大于等于n的单独组队，记录次数，剩下的双人组队，left从i开始，right从m-1开始，双指针判断大于等于n的组队，left右移，right左移，否则左移right找等大的数组队
const getRes1 = (m,arr,n)=>{
    // 先降序排序
    arr.sort((a,b)=>b-a);
    // 如果一个数>=n,则单独组队
    while(i<m && arr[i]>=n){
        res++;
        i++;
    }
    // 能力不够的，两个人组队
    let left = i,right = m-1;
    while(left<right){
        let sum = arr[left]+arr[right];
    //     如果组队能力>=n,则组队
        if(sum>=n){
            res++
            // left右移，right左移,找下一个
            left++;
            right--;
        }else{
            // 能力不够，right左移
            right--;
        }
    }
    return res;
}
