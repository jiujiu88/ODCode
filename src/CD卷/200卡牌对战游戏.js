/*
题目描述
有一种卡牌游戏，分为皇帝方和奴隶方，假设两方分别持有 n 张牌，每张牌都一个数字，数字越大，则牌越大。每张牌只能使用一次。
一共进行 n 次对战，每次对战胜利方获得一个积分，平局双方不得分。比赛结束时，谁的积分多，谁就赢得比赛。
由于皇帝方很自信，一开始就定好了出牌顺序。
请你帮助奴隶方指定出牌顺序，计算出所有赢得比赛的情况，并且各个情况需要按照赢得的积分降序。若存在赢得积分相同的情况，则按照出牌序列整体升序，比如：
1 3 2
1 2 3
这两种出牌序列都能赢得相同积分，则 1 2 3 排在前面，1 3 2 排在后面，因为第二个出牌 2 < 3
注意：奴隶方手中可能存在相同牌，比如 1 2 2 3，此时可能产生相同的出牌序列，这些相同情况只保留一个。

输入描述
第一行输入数字 n（n是一个正整数，不大于15）
第二行输入奴隶方的 n 张牌数字，以空格分隔
第三行输入皇帝方的 n 张牌数字，以空格分隔（注意皇帝牌的输入顺序，即为皇帝方出牌顺序）

输出描述
请输出奴隶方可以赢得比赛的出牌序列，每个序列输出一行，序列元素已空格分隔。序列输出顺序请看题目描述。
用例保证最终输出的出牌序列不超过10000个
若奴隶没有可以赢得比赛的出牌序列，则输出 null。

用例
输入
3
1 2 3
1 2 3
输出	2 3 1
说明
奴隶方可能的出牌序列：
1 2 3，奴隶得到积分0
1 3 2，奴隶得到积分1
2 1 3，奴隶得到积分1
2 3 1，奴隶得到积分2
3 1 2，奴隶得到积分1
3 2 1，奴隶得到积分1

奴隶想要赢得比赛至少需要得到2分，因此只有序列 2 3 1 符合要求。
原文链接：https://blog.csdn.net/qfc_128220/article/details/135024242
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const slaveList = (await readline()).split(" ").map(Number);
    const kingList = (await readline()).split(" ").map(Number);
    getRes(n,slaveList,kingList);
})()

// 全排列,计算每种情况的得分
const getRes = (n,slaveList,kingList)=>{
    // console.log(n,slaveList,kingList);
    let res = [];
    let path = [];
    const used = Array(n).fill(0);
    const dfs = (used)=>{
        if(path.length===n){
            res.push([...path]);
        }
        for(let i=0;i<n;i++){
            // !!!去重:此时可能产生相同的出牌序列，这些相同情况只保留一个。数层去重
            if(i>0 && slaveList[i]===slaveList[i-1] && !used[i-1]) continue;
            if(used[i]) continue;
            used[i]=true;
            path.push(slaveList[i]);
            dfs(used);
            used[i]=false;
            path.pop();
        }
    }
    dfs(used);
    let obj = {};
    for(let v of res){
        let count = 0;
        for(let i=0;i<n;i++){
            // v[i]为奴隶的出牌 较大积1分,较少比皇帝少一分,平局不变
            if(v[i]>kingList[i]){
                count++;
            }else if(v[i]<kingList[i]){
                count--;
            }
        }
        // 如果积分比皇帝多,那么记录为结果,出牌数组合并为字符串,便于排序
        if(count>0){
            if(!obj[count]){
                obj[count] = [];
            }
            obj[count].push(v);
        }
    }
    // 按分数降序
    let arr = Object.keys(obj).sort((a,b)=>b[0]-a[0]);
    // 将每个分数对应的多组出牌数组返回 出牌按照牌号升序
    // 计算出所有赢得比赛的情况，并且各个情况需要按照赢得的积分降序。若存在赢得积分相同的情况，则按照出牌序列整体升序
    for(let count of arr){
        // 卡牌排序，并forEach输出
        obj[count].sort((a,b)=>{
            // 按每张牌比较，不同的话升序，都一样，则返回0
            for(let i=0;i<n;i++){
                if(a[i]!==b[i]){
                    return a[i]-b[i];
                }
            }
            return 0;
        }).forEach(v=>console.log(v.join(" ")));
    }

    // res就是比赛的所有情况,循环每种情况,看下是否可以赢(积分比皇帝多)
    // let obj = {};
    // for(let v of res){
    //     let count = 0;
    //     for(let i=0;i<n;i++){
    //         // v[i]为奴隶的出牌 较大积1分,较少比皇帝少一分,平局不变
    //         if(v[i]>kingList[i]){
    //             count++;
    //         }else if(v[i]<kingList[i]){
    //             count--;
    //         }
    //     }
    //     // 如果积分比皇帝多,那么记录为结果,出牌数组合并为字符串,便于排序
    //     if(count>0){
    //         obj[v.join("")] = count;
    //     }
    // }
    // let arr = Object.entries(obj);
    // // 计算出所有赢得比赛的情况，并且各个情况需要按照赢得的积分降序。若存在赢得积分相同的情况，则按照出牌序列整体升序
    // arr.sort((a,b)=>a[1]===b[1]? parseInt(a[0])-parseInt(b[0]): b[1]-a[1])
    // .forEach(item=>{console.log(item[0].split("").join(" "))})

}