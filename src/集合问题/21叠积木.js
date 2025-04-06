/*
题目描述
给定字符串 target和 source，判断 target是否为 source 的子序列。

你可以认为target和 source 中仅包含英文小写字母。

字符串 source 可能会很长（长度~=500,000），而 target是个短字符串（长度<=100)。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。

（例如，”abc”是”aebycd”的一个子序列，而”ayb”不是）。

请找出最后一个子序列的起始位置。

输入描述
第一行为target，短字符串（长度 <=100）

第二行为source，长字符串（长度 ~= 500,000）

输出描述
最后一个子序列的起始位置，即最后一个子序列首字母的下标

备注
若在source中找不到target，则输出-1。

用例1
输入
abc
abcaybec
输出
3
说明
这里有两个abc的子序列满足，取下标较大的，故返回3。

输入1 1 2 3
输出-1
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(arr));
})()

// 思路：双指针,要将数组分成多组，每组为一个或两个积木之和，设置最大或者最大+最小为固定长度，一个循环判断
const getRes = (arr)=>{
    // 降序排序   3 2 1 1
    arr.sort((a,b)=>b-a);
    let n = arr.length;
    let sum = arr.reduce((a,b)=> a+b);
    let res = 0;
    // 如果数组只有一个数，返回1
    if(n==1) return 1;
    let maxLen = arr[0]+arr[n-1];
    let minLen = arr[0];
//     第一种，用minLen作为固定长度，这样的层级更多，符合要求直接返回
    let left = 0,right = n-1;
    while(left<n && arr[left]==minLen){
        res++;
        left++;
    }
//     剩下的都是两个一组
    while(left<right && arr[left]+arr[right]==minLen){
        res++;
        left++;
        right--;
    }
    // !!!如果left>right，说明所有的积木都符合要求 刚好用完就left在right右边
    if(left>right){
        return res;
    }
//     第二种，用maxLen作为固定长度
    left = 0;right = n-1;res = 0;
    while(left<right && arr[left]+arr[right]==maxLen){
        res++;
        left++;
        right--;
    }
    // 如果left>right，说明所有的积木都符合要求
    if(left>right){
        return res;
    }
    // 都不符合要求，返回-1
    return -1;
}

// 思路2：同leetcode698 划分为k个相等的子集  回溯划分-不限于每层有几个积木
// 等同于有n个球，分为k个桶，每个桶的和相等，求是否可以划分
const getRes1 = (arr)=>{
    let n = arr.length;
//     降序，先放大的球
    arr.sort((a,b)=>b-a);
    let sum = arr.reduce((a,b)=>a+b);
    let maxLen = arr[0]+arr[n-1];
    let minLen = arr[0];
    function backtrack(index,bucket,arr,k,target,counts){
        // 球用完了，返回true
        if(index==arr.length){
            return true;
        }
    //     循环所有桶，每个桶装和为target的球
        for(let i=0;i<arr.length;i++){
            // 剪枝 如果这个桶和上个桶容量一样，说明这个球放不进上个桶，肯定也放不进这个桶
            if(i>0 && bucket[i]==bucket[i-1]){
                continue;
            }
            // 超过桶容量，找下一个桶
            if(bucket[i]+arr[index]>target){
                continue;
            }
            // 超过2个球，跳过
            if(counts[i]>2){
                continue;
            }
            // 桶内放球
            bucket[i] += arr[index];
            counts[i]++;
            if(backtrack(index+1,bucket,arr,k,target,counts)) return true;
        //     回退
            bucket[i]=arr[index];
            counts[i]--;
        }
    //     循环完了，都没有返回true，说明不能划分
        return false;
    }
    // 第一种 minLen作为固定长度 这样返回层级k更多
    if(sum%minLen==0){
        let k = sum/minLen;
        let bucket = new Array(k).fill(0);
        // 限制每个桶最多装2个球，设置数组记录每个桶的球数
        let counts = new Array(k).fill(0);
        // 入参传入第x个球  如果可以划分，且每个桶的球都小于2个，则返回层级k
        if(backtrack(0,bucket,arr,k,minLen,counts) && counts.every(item=>item<=2)){
            return k;
        }
    }
    // 第一种 maxLen作为固定长度 这样返回层级k更多
    if(sum%maxLen==0){
        let k = sum/maxLen;
        let bucket = new Array(k).fill(0);
        // 限制每个桶最多装2个球，设置数组记录每个桶的球数
        let counts = new Array(k).fill(0);
        // 入参传入第x个球  如果可以划分，且每个桶的球都小于2个，则返回层级k
        if(backtrack(0,bucket,arr,k,maxLen,counts) && counts.every(item=>item<=2)){
            return k;
        }
    }
    return -1;
}