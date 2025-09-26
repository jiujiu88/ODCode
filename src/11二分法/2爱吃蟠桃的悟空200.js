/*
题目描述
孙悟空爱吃蟠桃，有一天趁着蟠桃园守卫不在来偷吃。已知蟠桃园有 N 棵桃树，每颗树上都有桃子，守卫将在 H 小时后回来。

孙悟空可以决定他吃蟠桃的速度K（个/小时），每个小时选一颗桃树，并从树上吃掉 K 个，如果树上的桃子少于 K 个，则全部吃掉，并且这一小时剩余的时间里不再吃桃。

孙悟空喜欢慢慢吃，但又想在守卫回来前吃完桃子。

请返回孙悟空可以在 H 小时内吃掉所有桃子的最小速度 K（K为整数）。如果以任何速度都吃不完所有桃子，则返回0。

输入描述
第一行输入为 N 个数字，N 表示桃树的数量，这 N 个数字表示每颗桃树上蟠桃的数量。

第二行输入为一个数字，表示守卫离开的时间 H。

其中数字通过空格分割，N、H为正整数，每颗树上都有蟠桃，且 0 < N < 10000，0 < H < 10000。

输出描述
吃掉所有蟠桃的最小速度 K，无解或输入异常时输出 0。

用例1
输入
2 3 4 5
4
输出
5
用例2
输入
2 3 4 5
3
输出
0
用例3
输入
30 11 23 4 20
6
输出
23
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const trees = (await readline()).split(" ").map(Number);
    const h = parseInt(await readline());
    console.log(getRes(trees,h))
}()

// 思路:二分法，用check方法求是否符合条件，求最小值
const getRes = (trees,h)=>{
    // 最小速度为1个/h，最大速度为一棵树上最多桃子的个数。
    let left = 1,right = Math.max(...trees);
    // 如果树的个数多于小时数，肯定吃不完
    if(trees.length>h){
        return 0;
    }
    function check(cost){
        let needH = 0;
        //     每棵树需要花费的时间为
        for(let v of trees){
            needH +=Math.ceil(v/cost);
        }
        return needH<=h;
    }
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        // 如果符合条件，找更小的
        if(check(mid)){
            right = mid - 1;
        }else{
            left = mid + 1;
        }
    }
    return left;
}
