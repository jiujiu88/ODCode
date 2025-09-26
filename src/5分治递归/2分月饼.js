const rl = require("readline").createInterface({
    input : process.stdin
})
/*
中秋节，公司分月饼，m 个员工，买了 n 个月饼，m ≤ n，每个员工至少分 1 个月饼，但可以分多个，
单人分到最多月饼的个数是 Max1 ，单人分到第二多月饼个数是 Max2 ，Max1 - Max2 ≤ 3 ，
单人分到第 n - 1 多月饼个数是 Max(n-1)，单人分到第n多月饼个数是 Max(n) ，Max(n-1) – Max(n) ≤ 3,
问有多少种分月饼的方法？
输入描述
每一行输入m n，表示m个员工，n个月饼，m ≤ n
输出描述
输出有多少种月饼分法
输入	2 4
输出	2
注意：1+3和3+1算一种分法
输入	3 5
输出	2
输入	3 12
输出	6
说明
满足要求的有6种分法：
12 = 1 + 1 + 10（Max1 = 10, Max2 = 1，不满足Max1 - Max2 ≤ 3要求）
12 = 1 + 2 + 9（Max1 = 9, Max2 = 2，不满足Max1 - Max2 ≤ 3要求）
12 = 1 + 3 + 8（Max1 = 8, Max2 = 3，不满足Max1 - Max2 ≤ 3要求）
12 = 1 + 4 + 7（Max1 = 7, Max2 = 4，Max3 = 1，满足要求）
12 = 1 + 5 + 6（Max1 = 6, Max2 = 5，Max3 = 1，不满足要求）
12 = 2 + 2 + 8（Max1 = 8, Max2 = 2，不满足要求）
12 = 2 + 3 + 7（Max1 = 7, Max2 = 3，不满足要求）
12 = 2 + 4 + 6（Max1 = 6, Max2 = 4，Max3 = 2，满足要求）
12 = 2 + 5 + 5（Max1 = 5, Max2 = 2，满足要求）
12 = 3 + 3 + 6（Max1 = 6, Max2 = 3，满足要求）
12 = 3 + 4 + 5（Max1 = 5, Max2 = 4，Max3 = 3，满足要求）
12 = 4 + 4 + 4（Max1 = 4，满足要求）
 */
rl.on("line",line=>{
    let [m,n] = line.split(" ").map(Number);
    let count = 0;
    let res = [];
    let remain = n;
    // 参数：index为第几个员工、remain为剩余月饼、min为最少月饼、max为最多月饼
    function dfs(index,min,max,remain){
        // 最后一个员工
        if(index==m){
            if(remain-min<=3){
                count++;
            }
            return;
        }
        // i为可分的月饼数量 员工最少1个月饼，最多n/m个月饼
        for(let i=min;i<=max;i++){
            remain -=i;
            dfs(index+1,i,Math.min(i+3,remain/(m-index)),remain);
            remain +=i;
        }
    }
    dfs(1,1,n/m,n);
    console.log(count);
})