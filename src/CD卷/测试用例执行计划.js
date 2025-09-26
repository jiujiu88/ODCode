/*
某个产品当前迭代周期内有N个特性（ F1,F2,…FN）需要进行覆盖测试，每个特性都被评估了对应的优先级，特性使用其ID作为下标进行标识。
设计了M个测试用例（T1,T2…,TM ），每个用例对应了一个覆盖特性的集合，测试用例使用其ID作为下标进行标识，
测试用例的优先级定义为其覆盖的特性的优先级之和。
在开展测试之前，需要制定测试用例的执行顺序，规则为：优先级大的用例先执行，如果存在优先级相同的用例，用例ID小的先执行。
输入描述：第一行输入为N和M，N表示特性的数量，M表示测试用例的数量，
0＜N≤100,
0＜M≤100 之后N行表示特性ID=1到特性ID=N的优先级。
再接下来M行表示测试用例ID=1到测试用例ID=M关联的特性的ID的列表。
输出描述：按照执行顺序（优先级从大到小）输出测试用例的ID，每行一个ID。
测试用例覆盖的ID不重复。
示例
示例1
输入：
5 4
1
1
2
3
5
1 2 3
1 4
3 4 5
2 3 4

原文链接：https://blog.csdn.net/weixin_52908342/article/details/135415370
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [n,m] = (await readline()).split(" ").map(Number);
    let priorityList = Array(n+1);
    // 特性和优先级的关系
    for(let i=1;i<=n;i++){
        priorityList[i] = parseInt(await readline());
    }
    // 用例和特性的对应关系
    let txList = Array(m+1);
    for(let i=1;i<=m;i++){
        txList[i] = (await readline()).split(" ").map(Number);
    }
    getRes(n,m,priorityList,txList);
})()

// 思路：注意：从1开始！，生成n+1长度的数组。
// 两个数组，存a[特性，优先级]、b[用例id，特性],遍历b，累加优先级。生成数组c[用例id，优先级]。优先级升序，用例id降序，输出用例id
const getRes = (n,m,priorityList,txList)=>{
    // console.log(n,m,priorityList,txList)
    let res = [];
//     计算每个用例的优先级
    for (let i=1;i<=m;i++){
        let count = 0;
        for(let v of txList[i]){
            count += priorityList[v];
        }
        res.push([i,count]);
    }
    // console.log(res);
    res.sort((a,b)=>b[1]==a[1]?a[0]-b[0]:b[1]-a[1]);
    res.forEach(v=>console.log(v[0]))
}