const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const n = parseInt(await readline());
    const arr  = (await readline()).split(" ").map(Number);
    const p_max = parseInt(await readline());
    console.log(getRes(n,arr,p_max));
})()

const getRes = (n,arr,p_max)=>{
//     求小于p_max的功率总和
    let res = [];
    // 子集 把所有的结果都记录下来
    const dfs = (index,sum)=>{
    //     返回结果
        res.push(sum);
        for(let i=index;i<n;i++){
            if(arr[i]+sum>p_max) break;
            sum+=arr[i];
            dfs(i+1,sum);
            sum-=arr[i];
        }
    }
    dfs(0,0);
    return Math.max(...res);
}

// 一个桶装球，桶的最大容量为p_max
const getRes = (n,arr,p_max)=>{
//     求小于p_max的功率总和
    let res = [];
    // 子集 把所有的结果都记录下来
    const dfs = (index,sum)=>{
        //     返回结果
        res.push(sum);
        for(let i=index;i<n;i++){
            if(arr[i]+sum>p_max) break;
            sum+=arr[i];
            dfs(i+1,sum);
            sum-=arr[i];
        }
    }
    dfs(0,0);
    return Math.max(...res);
}

//01背包 记忆化搜索
const getRes = (n,arr,p_max)=>{
        const dp = new Array(n + 1).fill(0).map(() => new Array(p_max + 1).fill(0));
        for (let i = 1; i <= n; i++) {
            const p = arr[i - 1];
            for (let j = 0; j <= p_max; j++) {
                if (j < p) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - p] + p);
                }
            }
        }
        return dp[n][p_max];
}