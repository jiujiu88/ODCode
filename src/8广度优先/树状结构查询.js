/*
题目描述
通常使用多行的节点、父节点表示一棵树，比如
西安 陕西
陕西 中国
江西 中国
中国 亚洲
泰国 亚洲
输入一个节点之后，请打印出来树中他的所有下层节点

输入描述
第一行输入行数，下面是多行数据，每行以空格区分节点和父节点
接着是查询节点

输出描述
输出查询节点的所有下层节点。以字典序排序

示例1
输入
5
b a
c a
d c
e c
f d
c
输出
d
e
f
说明

原文链接：https://blog.csdn.net/banxia_frontend/article/details/131466063
 */
// 思路：
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const n = parseInt(await readline());
    // 记录key为父节点，value为所有子节点
    let map = {};
    for(let i=0;i<n;i++){
        const [son,fa] = (await readline()).split(" ");
        if(!map[fa]){
            map[fa] = new Set();
        }
        map[fa].add(son);
    }
    const target = await readline();
    getRes(n,map,target);
})()

// 思路：不需要找根节点，层序遍历，只要找到当前那个节点，找到他的下层节点，加入队列开始遍历，把遍历到的所有元素都记录到结果中
function getRes(n,map,target) {
    // console.log(n,map,target)
    let res = [];
    // 层序遍历 ，从目标节点的子节点开始遍历，把所有遍历到的节点都加入结果
    let queue = [...map[target]];
    while(queue.length){
        const cur = queue.shift();
        // 记录结果
        res.push(cur);
        if(map[cur]){
            queue.push(...map[cur]);
        }
    }
    res.sort((a,b) => a.charCodeAt()-b.charCodeAt())
        .forEach(v=>console.log(v));
}