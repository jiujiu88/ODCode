/*
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
输入	6 2 7 7 9 3 2 1 3 11 4
2
输出	28
说明	共有两位员工，其中一位分配需求 6 2 7 7 3 2 1 共需要28天完成，另一位分配需求 9 3 11 4 共需要27天完成，故完成所有工作至少需要28天。
 */
// 同698 +二分法，看下哪个桶容量是最小的
const rl = require("readline").createInterface({
    input :process.stdin
})
let lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==2){
        let m = lines[0].split(" ").map(Number);
        let n = parseInt(lines[1]);
        let res = Infinity;
        // 降序，先放大球
        m.sort((a, b) => b - a);
        let sum = m.reduce((a, b) => a + b);
        // 二分查找target，看下哪个桶容量最小 容量最大为总和sum，最小为m[0]
        let l=m[0],r = sum;
        while(l<=r){
            let mid = Math.floor((l+r)/2);
            // 如果这个桶容量满足要求，继续缩小容量，找到最小为止
            // 设置n个桶，桶内放球的和---每次桶都要清空重新放
            let buckets = new Array(n).fill(0);
            if(getRes(0,buckets,sum,m,n,mid)){
                res = Math.min(res,mid);
                r = mid-1;
            }else{
                l = mid+1;
            }
        }
        console.log(res);
        lines.length=0;
    }
})

function getRes(index,buckets,sum,nums,k,target) {
    // 参数：第index个球开始放入桶中
    // 球放完了，返回
    if (index === nums.length) {
        return true;
    }
    // 循环每个桶
    for (let i = 0; i < k; i++) {
        // 超过桶的容量，继续找下一个桶
        if (buckets[i] + nums[index] > target) continue;
        // 如果这个桶容量和上个桶一样，表示上个桶已经试过，这个球放不进去
        if (i > 0 && buckets[i] == buckets[i - 1]) continue;
        buckets[i] += nums[index];
        // 放下一个球
        if(getRes(index + 1,buckets,sum,nums,k,target)) return true;
        buckets[i] -= nums[index];
    }
    //    返回结果
    return false;
}