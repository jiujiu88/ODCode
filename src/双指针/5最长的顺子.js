/*
题目描述
斗地主起源于湖北十堰房县，据说是一位叫吴修全的年轻人根据当地流行的扑克玩法“跑得快”改编的，如今已风靡整个中国，并流行于互联网上。

牌型：单顺，又称顺子，最少5张牌，最多12张牌(3…A)不能有2，也不能有大小王，不计花色。

例如： 3-4-5-6-7-8，7-8-9-10-J-Q，3-4-5-6-7-8-9-10-J-Q-K-A

可用的牌 3<4<5<6<7<8<9<10<J<Q<K<A<2<B(小王)<C(大王)，每种牌除大小王外有四种花色

(共有13×4+2张牌)

输入：

手上有的牌
已经出过的牌(包括对手出的和自己出的牌)
输出：

对手可能构成的最长的顺子(如果有相同长度的顺子，输出牌面最大的那一个)，
如果无法构成顺子，则输出 NO-CHAIN。
输入描述
输入的第一行为当前手中的牌

输入的第二行为已经出过的牌

输出描述
最长的顺子

用例1
输入
3-3-3-3-4-4-5-5-6-7-8-9-10-J-Q-K-A
4-5-6-7-8-8-8
输出
9-10-J-Q-K-A
用例2
输入
3-3-3-3-8-8-8-8
K-K-K-K
输出
NO-CHAIN
说明
剩余的牌无法构成顺子
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const own = (await readline()).split("-");
    const out = (await readline()).split("-");
    console.log(getRes(own,out));
})()

// 思路：先算出对手的牌，再计算最长的顺子
const getRes = (own,out)=>{
    // 先计算对手的牌-只记录可以成顺子的牌，所有的牌-手上的牌-出的牌,！！！加上AA，避免A的计算
    const map = {"3":4,"4":4,"5":4,"6":4,"7":4,"8":4,"9":4,"10":4,"J":4,"Q":4,"K":4,"A":4,"AA":0};
    for(let v of own){
        // !!!如果是未定义的字段，不要进来
        if(map[v]!=undefined){
            map[v]--;
        }
    }
    for(let v of out){
        if(map[v]!==undefined){
            map[v]--;
        }
    }
    // 循环map，找到能凑成的顺子
    let res = [];
    let path = [];
    for(let v in map){
        if(map[v]==0){
            if(path.length>=5){
                res.push(path);
            }
            path = [];
        }else{
            path.push(v);
        }
    //     最后一个元素A，符合要求计入res--优化，map加入AA，值为0，可走map[v]==0分支计算
    //     if(v=="A"){
    //         if(path.length>=5){
    //             res.push(path);
    //         }
    //     }
    }
    if(res.length) {
        // 给所有的顺子排序
        res.sort((a, b) => {
            if (a.length === b.length) {
                return b[0] - a[0];
            }
            return b.length - a.length;
        })
        return res[0].join("-");
    }else{
        return "NO-CHAIN";
    }
}
