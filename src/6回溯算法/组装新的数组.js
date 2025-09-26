/*
题目描述
给你一个整数 M 和数组 N, N 中的元素为连续整数，要求根据 N 中的元素组装成新的数组 R，组装规则：
R 中元素总和加起来等于 M
R 中的元素可以从 N 中重复选取
R 中的元素最多只能有 1 个不在 N 中，且比 N 中的数字都要小（不能为负数）
请输出：数组 R 一共有多少组装办法

输入描述
第一行输入是连续数组 N，采用空格分隔
第二行输入数字 M

输出描述
输出的是组装办法数量，int类型

备注
1≤N.length≤30
1≤N.length≤1000

输入
2
5
输出
1
说明
只有1种组装办法，就是[2,2,1]

示例二
输入
2 3
5
输出
2
说明
一共 2 种组装办法，分别是 [2,2,1] [2,3]
原文链接：https://blog.csdn.net/hihell/article/details/129167769
 */

//
const rl = require("readline").createInterface({
    input :process.stdin
})
let lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==2){
        let arr = lines[0].split(" ").map(Number);
        let m = parseInt(lines[1]);
    //     可以有一个元素不在arr中，但是要比arr所有元素小
        arr.sort((a,b) => a - b);
        const min = arr[0];
        let res = 0;
        const dfs = (startIndex,sum)=>{
            // console.log(target,sum,path)
            // 和等于m、或者有额外的数字，这个元素大于0，小于min
            if(sum===m || (m-sum>0 && m-sum<min)){
                res++;
            }
            for(let i=startIndex;i<arr.length;i++){
                // 如果当前和已经比m大了，后面的更大，直接break
                if(sum>m) break;
                // 开始元素可以重复选，因此下一个为i，而不是i+1
                dfs(i,sum+arr[i]);
            }
        }
        dfs(0,0);
        console.log(res);
    }
})
