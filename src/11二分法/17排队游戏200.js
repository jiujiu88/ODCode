/*
新来的老师给班里的同学排一个队。

每个学生有一个影力值。

一些学生是刺头，不会听老师的话，自己选位置，非刺头同学在剩下的位置按照能力值从小到大排。

对于非刺头同学，如果发现他前面有能力值比自己高的同学，他不满程度就增加，增加的数量等于前面能力值比他大的同学的个数。

刺头不会产生不满。

如果整个班级累计的不满程度超过k，那么老师就没有办法教这个班级了。

输入描述
输入有三行：

第一行为n,m,k,空格隔开，分别表示班级总人数，刺头人数，最大不满程度k。

第二行为刺头所在位置(从0开始，即排队数组的下标，比如1代表队伍中第2个同学是刺头)，位置的数组也是排序的。

第三行有n个数，空格隔开，表示老师排好的队中每个人的能力值，其中非刺头同学一定按照能力值从小到大排好序的。

输出描述
0 表示老师可以继续教这个班级

1 表示老师无法继续教这个班级

备注
n 范围是[1,100000]
m 范围是 [1,n]

示例1:
输入
4 2 3
0 1
1810 1809 1801 1802
输出
1
说明
刺头在0,1位置，2号同学不满程度2(前面两人刺头能力值都比他大)，3号同学不满程度2，总不满程度4，大于3。输出不能教这班(1).
示例2:
输入
4 2 4
0 1
1810 1809 1801 1802
输出:
0
说明:
同前，4不大于4，输出能教这个班(0)

输入
5 2 2
2 3
1000 1001 1003 1003 1002
输出0
*/

// 二分 一次循环，计算每个人插入刺头数组的位置idx。
// ①非刺头：刺头数组长度x，愤怒值加上x-idx(idx后面都是刺头) ②刺头：插入刺头数组正确顺序，保证升序
const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const [n,m,k] = (await readline()).split(" ").map(Number);
    const bad = (await readline()).split(" ").map(Number);
    const list = (await readline()).split(" ").map(Number);
    console.log(getRes(n,m,k,bad,list))
}()


// 思路：一次循环，记录前面的刺头同学数组，轮到非刺头时，看下能排到刺头的哪个位置（排后面），计算出愤怒值（bad.length-idx）；到刺头，用splice加入。保持数组升序。
const getRes = (n,m,k,bad,list)=>{
    const badList = [];
    let count = 0;
    for(let i=0;i<list.length;i++){
        // 求这个同学插入刺头组的位置且要靠后的位置，他后面的刺头比他能力值高（badList.length-idx），他会生气，跟他相同能力值的不会生气
        const idx = binarySearch(badList,list[i]+1);
        // 到了非刺头学生，计算在他前面的刺头数组，看他在数组中排位下标，在哪些人后面愤怒值就是多少
        if(!bad.includes(i)) {
            count += badList.length - idx;
        }else{
            // 到了刺头同学,要保持数组是升序的
            badList.splice(idx,0,list[i]);
        }
    }
    return count>k?1:0;
}

// 思路:二分插入位置  循环计算，算非刺头同学在刺头数组中的位置，该位置后面的所有刺头的能力值都比他高，因此生气值为len-idx。循环累加最终结果
/*const getRes = (n,m,k,arr,bilitys)=>{
    // 获取刺头同学数组
    let picks = [];
    let sum = 0;
    // !!一次循环，计算非刺头在数组的位置，这个是在他前面加入数组的刺头，如果能力比他高，就是对应的生气值。
    for(let i=0;i<n;i++){
        // ！！计算插入靠后的位置，这样才能保证后面的都比该位置高  例如 1 1 2 插入位置为2，这样算出len-2=1个能力值更高。
        let idx = binarySearch(picks, bilitys[i]+1);
        if(arr.includes(i)){
            // 将刺头学生的能力值加入数组
            picks.splice(idx,0,bilitys[i]);
        }else{
            // 非刺头学生，区间[idx,picks.length-1]的刺头同学能力值都比他大，因此生气值为刺头个数-该同学插入位置
            sum +=picks.length - idx;
        }
    }
    return sum>k?1:0;
}*/

// 记录每个同学在刺头数组的位置
const binarySearch = (weights,target)=>{
    let left = 0,right = weights.length-1;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(weights[mid]>=target){
            right = mid -1;
        }else{
            left = mid + 1;
        }
    }
    // 结果是mid即right+1=left
    return left;
}
