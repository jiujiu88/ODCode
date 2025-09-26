/*
题目描述
公元2919年，人类终于发现了一颗宜居星球——X星。 现想在X星一片连绵起伏的山脉间建一个天热蓄水库，如何选取水库边界，使蓄水量最大？

要求：

山脉用正整数数组s表示，每个元素代表山脉的高度。
选取山脉上两个点作为蓄水库的边界，则边界内的区域可以蓄水，蓄水量需排除山脉占用的空间
蓄水量的高度为两边界的最小值。
如果出现多个满足条件的边界，应选取距离最近的一组边界。
输出边界下标（从0开始）和最大蓄水量；如果无法蓄水，则返回0，此时不返回边界。

例如，当山脉为s=[3,1,2]时，则选取s[0]和s[2]作为水库边界，则蓄水量为1，此时输出：0 2:1

当山脉s=[3,2,1]时，不存在合理的边界，此时输出：0。

输入描述
一行正整数，用空格隔开，例如输入

1 2 3

表示s=[1,2,3]

输出描述
当存在合理的水库边界时，输出左边界、空格、右边界、英文冒号、蓄水量；例如

0 2:1

当不存在合理的书库边界时，输出0；例如

0

备注
1 ≤ length(s) ≤ 10000
0 ≤ s[i] ≤ 10000
用例1
输入
1 9 6 2 5 4 9 3 7
输出
1 6:19
说明
经过分析，选取s[1]和s[6]，水库蓄水量为19（3+7+4+5）

用例2
输入
1 8 6 2 5 4 8 3 7
输出
1 6:15
说明
经过分析，选取s[1]和s[8]时，水库蓄水量为15；同样选取s[1]和s[6]时，水库蓄水量也为15。由于后者下标距离小（为5），故应选取后者。

用例3
输入
1 2 3
输出
0
说明
不存在合理的水库边界
 */
const rl = require("readline").createInterface({
    input :process.stdin,
    output: process.stdout,
})
// const iter = rl[Symbol.asyncIterator]();
// const readline = async ()=>(await iter.next()).value;
// void (async function (){
//     const arr = (await readline()).split(" ").map(Number);
//     console.log(getRes(arr));
// })()

rl.on("line", (line) => {
    const h = line.split(" ").map(Number);

    console.log(getRes(h));
});

// 思路：参考leetcode42接雨水   ！！！蓄水如果有隔断，分为多个蓄水池，只要算最大的那个,用前后缀分解方式计算
const getRes = (arr)=>{
    const n = arr.length;
//     用前后缀分解的方式记录每一个高度，这样隔断的时候记录前后下标和蓄水值
    let preMax = new Array(n).fill(0);
    preMax[0] = arr[0];
    for(let i=1;i<preMax.length;i++){
        // 取当前值和前面山脉的最大值
        preMax[i] = Math.max(preMax[i-1],arr[i]);
    }
    let sufMax = new Array(n).fill(0);
    sufMax[n-1] = arr[n-1];
    for(let i=n-2;i>=0;i--){
        // 取当前值和后面山脉的最大值
        sufMax[i] = Math.max(arr[i],sufMax[i+1]);
    }
    // 分别用来记录下标和蓄水量
    let idxList = [];
    let countList = [];
    // 记录连续蓄水量的和
    let max = 0;
    let path = [];
    let isOpen = false;
    // 循环遍历  每个山脉的蓄水量为前后缀较小值-山脉高度
    //         1 9 6 2 5 4 9 3 7
    // preMax  1 9 9 9 9 9 9 9 9
    // sufMax  9 9 9 9 9 9 9 7 7
    for(let i=0;i<n;i++){
        let count = Math.min(preMax[i],sufMax[i])-arr[i];
        if(count >0){
            // 如果前面也有蓄水或者刚开始蓄水，那么累加
            if(isOpen || max==0){
                max += count;
                // 记录左下标
                if(path.length==0){
                    path.push(i-1);
                }
            }
            isOpen = true;
        }else{
            isOpen = false;
            //     如果有蓄水量，隔断了记录右边界
            if(max>0){
                path.push(i);
                // 记录结果
                idxList.push(path);
                countList.push(max);
            }
            // 清空计数变量
            max = 0;
            path = [];
        }
    }
    // 如果出现多个满足条件的边界，应选取距离最近的一组边界
    if(idxList.length){
        return countList + '----'+idxList;
    }else{
        return 0;
    }
}