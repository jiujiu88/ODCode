/*
题目描述
给定一个矩阵，包含 N * M 个整数，和一个包含 K 个整数的数组。

现在要求在这个矩阵中找一个宽度最小的子矩阵，要求子矩阵包含数组中所有的整数。

输入描述
第一行输入两个正整数 N，M，表示矩阵大小。

接下来 N 行 M 列表示矩阵内容。

下一行包含一个正整数 K。

下一行包含 K 个整数，表示所需包含的数组，K 个整数可能存在重复数字。

所有输入数据小于1000。

输出描述
输出包含一个整数，表示满足要求子矩阵的最小宽度，若找不到，输出-1。

用例1
输入
2 5
1 2 2 3 1
2 3 2 3 2
3
1 2 3
输出
2
说明
矩阵第0、3列包含了1，2，3，矩阵第3，4列包含了1，2，3

用例1
输入
2 5
1 2 2 3 1
1 3 2 3 4
3
1 1 4
输出
5
说明
矩阵第1、2、3、4、5列包含了1、1、4
输入
8 8
9 1 6 1 7 6 3 1
2 5 1 8 2 3 1 4
3 8 7 9 1 5 2 4
8 9 8 6 1 2 5 2
4 3 1 6 9 7 3 8
5 1 8 1 8 5 8 2
6 3 3 1 8 7 9 1
5 2 2 3 5 4 7 8
8
7 6 2 7 7 6 5 6
输出3
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：尺取法 记录总的出现次数，滑窗判断是否满足条件 滑窗新增处理字符：cnt[c]>0  滑窗删除处理字符：cnt[c]>=0
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [n,m] = (await readline()).split(" ").map(Number);
    const grid = [];
    for(let i=0;i<n;i++){
        grid.push((await readline()).split(" ").map(Number));
    }
    const k = parseInt(await readline());
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(n,m,grid,k,arr));
})()

const getRes = (n,m,grid,k,arr)=>{
    let res = Infinity;
    // 循环grid，用滑窗获取包含哪些字符
    let left = 0;
    // 记录符合要求的元素个数，当total变为0时表示符合条件的都找到了
    let total = k;
    // 用cnt记录需要满足出现的字符的次数，条件中矩阵元素为整数，可能为负数，不能用new Array(1000);
    let cnt = {};
    for(let v of arr){
        if(cnt[v]==undefined){
            cnt[v] = 0;
        }
        cnt[v]++;
    }
    // 按照列循环grid,获取i列j行表示为grid[j][i]
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            let v = grid[j][i];
            // cnt[v]--;
            // 如果找到符合要求的目标元素，则total-1，并处理cnt,cnt大于0时才相当于找到一个符合元素，如果有多个元素符合只记录cnt
            if(cnt[v]!=undefined && cnt[v]-->0){
                total--;
            }
            /*
            if(cnt[v]!=undefined){
                if(cnt[v]>=0){
                    total--;
                }
                cnt[v]--;
            }
             */
        }
        // 如果都符合条件了，缩小窗口
        while(total==0){
            // 如果符合要求，记录结果
            res = Math.min(res,i-left+1);
            // 将左指针的列移出，直至不满足要求
            for(let j=0;j<n;j++){
                let v = grid[j][left];
                // cnt[v]++;
                // 如果找到符合要求的目标元素，则total-1，并处理cnt,cnt大于等于0时才相当于找到一个符合元素，如果有多个元素符合只记录cnt
                if(cnt[v]!=undefined && cnt[v]++>=0){
                    total++;
                }
                /*
                if(cnt[v]!=undefined){
                    if(cnt[v]>=0){
                        total++;
                    }
                    cnt[v]++;
                }
                 */
            }
            left++;
        }
    }
    return res==Infinity?-1:res;
}