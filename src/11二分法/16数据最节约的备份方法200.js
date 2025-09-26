/*
题目描述：
有若干个文件，使用刻录光盘的方式进行备份，假设每张光盘的容量是 500MB，求使用光盘最少的文件分布方式
所有文件的大小都是整数的 MB，且不超过 500MB；文件不能分割、分卷打包

输入描述：
一组文件大小的数据

输出描述：
使用光盘的数量

补充说明：
不用考虑输入数据不合法的情况；假设最多 100 个输入文件。

示例 1
输入：
100,500,300,200,400
输出：
3
说明：
(100,400),(200,300),(500) 3 张光盘即可。
输入和输出内容都不含空格。

示例 2
输入：
1,100,200,300
输出：
2

输入
330,90,360,390,260,70,370,250,180,330,220,50,310,320,110,170,450,10,30,60,420,440,110,10,10,190,190,310,140,270,60,260,310,10,360,490,140,300,490,110,80,120,210,150,330,480,220,60,440,160,360,280,380,250,20,360,380,410,460,60,450,210,270,50,20,370,220,190,440,290,60,490,470,20,40,80,220,220,490,90,10,130,330,60,370,70,130,100,410,350,60,360,330,290
输出45
*/

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const arr = (await readline()).split(",").map(Number);
    console.log(getRes(arr))
}()

// 思路:二分法+集合回溯(桶装球,同698划分为k个相等的子集) 确定桶的容量500，不确定桶的数量，因此用二分法找桶的数量，检查桶的数量是否可以满足条件（桶装球），找到最小的桶数量
const getRes = (arr)=>{
//     有res个桶，往里面依次装球
//     降序 先装大球
    arr.sort((a,b)=>b-a);
    const n = arr.length;
    // 二分法找出桶的数量 桶最少1个，最多n个
    let left = 1,right = n;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        let buckets = new Array(mid).fill(0);
        // 如果桶的数量满足，找更小的桶数量
        if(backtracking(buckets,arr,n,mid,0)){
            right = mid -1;
        }else{
            left = mid +1;
        }
    }
    return left;
}

// 集合回溯 桶装球，计算是否能把球装完  变量index为第i个球
const backtracking = (buckets,arr,n,mid,index)=>{
    // 如果index等于数据数量，表示球装完了
    if(index==n){
        return true;
    }
    // 循环桶
    for(let i=0;i<mid;i++){
        // 如果这个桶装不下，则装下一个桶
        if(buckets[i]+arr[index]>500){
            continue;
        }
        // 剪枝 如果这个桶和上个桶容量一样，找下个桶，因为这个球在上个桶已确认过装不下
        if(i>0 && buckets[i-1]==buckets[i]){
            continue;
        }
        // 将球加入桶容量中
        buckets[i]+=arr[index];
        if(backtracking(buckets,arr,n,mid,index+1)) return true;
    //     回退
        buckets[i]-=arr[index];
    }
    return false;
}

// ！！错误做法60分：排序取最大最小，如果可以装入一个光盘，则用完一个，这样会有一些空余，正确排放可能需要更少结果
const getRes1 = (arr)=>{
    arr.sort((a,b)=>a-b);
    let right = arr.length-1;
    let left = 0;
    let sum = 0;
    let res = 0;
    while(left<right){
        sum = arr[right];
        while(sum <=500){
            sum +=arr[left++];
        }
        res++;
        right--;
        left--;
    }
    if(left==right){
        res++;
    }
    return res;
}
