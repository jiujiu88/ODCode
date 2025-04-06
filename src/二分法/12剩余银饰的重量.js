/*
有N块二手市场收集的银饰，每块银饰的重量都是正整数，收集到的银饰会被熔化用于打造新的饰品。

每一回合，从中选出三块 最重的 银饰，然后一起熔掉。

假设银饰的重量分别为 x 、y和z，且 x <= y <= z。那么熔掉的可能结果如下：

如果 x == y == z，那么三块银饰都会被完全熔掉；
如果 x == y 且 y != z，会剩余重量为 z - y 的银块无法被熔掉；
如果 x != y 且 y == z，会剩余重量为 y - x 的银块无法被熔掉；
如果 x != y 且 y != z，会剩余重量为 z - y 与 y - x 差值 的银块无法被熔掉。
最后，如果剩余两块，返回较大的重量（若两块重量相同，返回任意一块皆可）；
如果只剩下一块，返回该块的重量；如果没有剩下，就返回 0。
输入描述
输入数据为两行
第一行为银饰数组长度 n，1 ≤ n ≤ 40，
第二行为 n 块银饰的重量，重量的取值范围为[1，2000]，重量之间使用空格隔开
输出描述
如果剩余两块，返回较大的重量（若两块重量相同，返回任意一块皆可）；如果只剩下一块，返回该块的重量；如果没有剩下，就返回 0。
示例一
输入
3
1 1 1
输出
0
说明
选出 1 1 1，得到 0，最终数组转换为 []，最后没有剩下银块，返回 0

示例二
输入
3
3 7 10
输出
1
说明
选出 3 7 10，需要计算 (7-3) 和 (10-7) 的差值，即(7-3)-(10-7)=1，所以数组转换为 [1]，剩余一块，返回该块重量，返回 1

输入
8
820 1902 49 1157 1707 334 770 236
输出
67
*/

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const n = parseInt(await readline());
    const weights = (await readline()).split(" ").map(Number);
    console.log(getRes(weights,n))
}()

// 思路:二分插入位置+循环（维持数组一直有序）  每次取最重的3块，按条件熔完后将剩下的重量用二分记录插入位置，加入数组中，然后删掉最重的3个，直到数组个数小于3个，取结果
const getRes = (weights,n)=>{
    // 升序排序--二分法要升序
    weights.sort((a,b)=>a-b);
    // 当数组个数>=3,一直循环
    while(weights.length>=3) {
        // 从数组最后取最重的3块，并删除--用pop
        let z = weights.pop(), y = weights.pop(), x = weights.pop();
        // 剩下的就是差值
        let diff = Math.abs((z - y) - (y - x));
        // 如果有差值，记录位置
        if(diff>0) {
            let idx = binarySearch(weights,diff);
            // 在下标idx处将diff加入heights，这样维持数组还是有序的
            weights.splice(idx, 0, diff);
        }
    }
//     记录结果
    if(weights.length==0){
        return 0;
    }else if(weights.length==1){
        return weights[0];
    }else{
        return weights[1];
    }
}

// 记录剩余的银饰应该插入哪个位置
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
