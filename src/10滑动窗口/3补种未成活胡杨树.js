/*
某沙漠新种植 N 棵胡杨（编号1-N），排成一排。一个月后，有 M 棵胡杨未能成活。
现可补种胡杨 K 棵，请问如何补种（只能补种，不能新种），可以得到最多的连续胡杨树？
输入描述
N 总种植数量
1 ≤ N ≤ 100000
M 未成活胡杨数量，M 个空格分隔的数，按编号从小到大排列
1 ≤ M ≤ N
K 最多可以补种的数量，
0 ≤ K ≤ M
输出描述
最多的连续胡杨棵树
用例
输入
5
2
2 4
1
输出
3
说明	补种到2或4结果一样，最多的连续胡杨棵树都是3。
输入
10
3
2 4 7
1
输出	6
说明	补种第7棵树，最多连续胡杨树棵数位6（5，6，7，8，9，10）

1 2 3 4 5
 */
/*
const rl = require("readline").createInterface({
    input:process.stdin
})
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function (){
    const n = parseInt(await readline());
    const m = parseInt(await readline());
    const death = (await readline()).split(" ").map(Number);
    const k = parseInt(await readline());
    let res = 0;
    // 如果可以补种的棵树等于未成活棵树，连续棵树为n;
    if(k==m) res = n;
//     补种如果起始位置太靠后，补种数用不完，起始位置最后在m-k的位置可以补满不浪费 范围[0,m-k]
//     分3种情况
    for(let i=0;i<=m-k;i++) {
        if(i==0) {
            //     从左边补种 初始为0 边界为1，death[k]-1
            res = death[k] - 1;
        }else if(i==m-k) {
            //     从右边补种 边界为death[m - k - 1]+1，n棵
            res = n - death[m - k - 1];
        }else{
            //     从中间补种 初始为i 边界为death[i-1]+1,death[i+k]-1
            res = death[i + k] - 1 - death[i - 1];
        }
    }
    console.log(res);

}()
*/

const rl = require("readline").createInterface({
    input:process.stdin
})
const lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==4){
        let [n,m,k] = [lines[0],lines[1],lines[3]].map(Number);
        let arr = lines[2].split(" ").map(Number);
        let res = 0;
        // 如果可以补种的数量和未成活的一样多，全是连续的
        if(m==k){
            console.log(n);
            return;
        }
        // 最多有n-m+k颗连续的胡杨树
        // 1 0 1 0 1 0 1
        // 2 4 6
        for(let i=0;i<=m-k;i++){
            if(i==0){
                // 从前往后补种 可以补种arr[k-1]，到arr[k]是没补种的，连续长度为1~arr[k]-1
                res = Math.max(res,arr[k]-1);
            }else if(i==m-k){
                // 从后往前补种 可以补种arr[m-k],到arr[m-k-1]是没补种的，连续长度为arr[m-k-1]+1~n
                res = Math.max(res,n-arr[m-k-1]);
            }else{
                // 从中间开始补种 可以补种arr[i]到arr[i+k-1],连续长度为arr[i-1]+1~arr[i+k]-1
                res = Math.max(res,arr[i+k]-1-arr[i-1]);
            }
        }
        console.log(res);
        lines.length = 0;
    }
})