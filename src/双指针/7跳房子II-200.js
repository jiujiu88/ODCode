/*
题目描述
跳房子，也叫跳飞机，是一种世界性的儿童游戏。

游戏参与者需要分多个回合按顺序跳到第1格直到房子的最后一格，然后获得一次选房子的机会，直到所有房子被选完，房子最多的人获胜。

跳房子的过程中，如果有踩线等违规行为，会结束当前回合，甚至可能倒退几步。

假设房子的总格数是count，小红每回合可能连续跳的步数都放在数组steps中，请问数组中是否有一种步数的组合，可以让小红三个回合跳到最后一格?

如果有，请输出索引和最小的步数组合（数据保证索引和最小的步数组合是唯一的）。

注意：数组中的步数可以重复，但数组中的元素不能重复使用。

输入描述
第一行输入为房子总格数count，它是int整数类型。 第二行输入为每回合可能连续跳的步数，它是int整数数组类型

输出描述
返回索引和最小的满足要求的步数组合（顺序保持steps中原有顺序）

备注
count ≤ 10000
3 ≤ steps.length ≤ 10000
-100000 ≤ steps[i] ≤ 100000
用例1
输入
[1,4,5,2,0,2]
9
输出
[4,5,0]
用例2
输入
[1,5,2,0,2,4]
9
输出
[5,2,2]
用例3
输入
[-1,2,4,9]
12

输入
[1,2,0,1,3,2,-1]
4
输出[1,2,1]
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const steps = JSON.parse(await readline());
    const count = parseInt(await readline());
    console.log(getRes(steps,count));
})()

// 思路：先用对象记录索引和值的对应关系，然后对steps排序，参考三数之和，求值。
const getRes = (steps,count)=>{
//     面积计算：两根柱子的距离*较矮柱子的高度
    let arr = [];
    for(let i=0;i<steps.length;i++){
        arr.push({
            idx:i,
            val:steps[i]
        });
    }
//     按照值升序排序，参考三数之和   ！！！下标也要升序排序，值相等时会用到
    arr.sort((a,b)=>a.val==b.val?a.idx-b.idx:a.val-b.val);
    let minIdxSum = Infinity;
    let res = [];
    for(let i=0;i<arr.length-2;i++){
        // i如果跟上一个一样，此时下标变大，不用计算 剪枝优化
        if(i>0 && arr[i].val===arr[i-1].val){
            continue;
        }
        let left = i+1,right = arr.length-1;
        while(left<right){
            let sum = arr[i].val+arr[left].val+arr[right].val;
            if(sum===count){
                // !!!注意left<right-1条件，不能让left和right的值相等
                // 如果right左边索引的值与当前值相等，那么需要取right-1的索引，这样更小，否则在left++，right--时，会错过正确的数据
                while(left<right-1 && arr[right].val===arr[right-1].val){
                    right--;
                }
                // 求索引和最小的步数组合（数据保证索引和最小的步数组合是唯一的）
                let idxSum = arr[i].idx+arr[left].idx+arr[right].idx;
                if(idxSum<minIdxSum){
                    minIdxSum = idxSum;
                    // 返回索引和最小的满足要求的步数组合（顺序保持steps中原有顺序）
                    let ans = [arr[i],arr[left],arr[right]].sort((a,b)=>a.idx-b.idx);
                    res = [ans[0].val,ans[1].val,ans[2].val];
                }
                // 减枝
                while(left+1<right && arr[left].val===arr[left+1].val){
                    left++;
                }
                left++;
                right--;
            }else if(sum>count){
                right--;
            }else{
                left++;
            }
        }
    }
    // 返回字符串
    return JSON.stringify(res);
}
