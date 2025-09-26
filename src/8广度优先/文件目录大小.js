/*
题目
一个文件目录的数据格式为: 目录id，本目录中文件大小，(子目录id列表)其中目录id全局唯一，取值范围[1,200]，
本目录中文件大小范围[1,1000]，子目录id列表个数[0,10]

例如 : 1 20 (2,3)表示目录1中文件总大小是20，有两人子目录，id分别是2和3
现在输入一个文件系统中所有目录信息，以及待查询的目录id，返回这个目录和及该目录所有子目录的大小之和
输入描述
第一行为两个数字M，N，分别表示目录的个数和待查询的目录id.
1≤M≤100
1≤N≤200
接下来M行，每行为1个目录的数据
目录id 本目录中文件大小(子目录id列表)
子目录列表中的子目录id以逗号分隔

输出描述
待查询目录及其子目录的大小之和
示例1：

输入
3 1
3 15 (0)
1 20 (2)
2 10 (3)
输出
45
说明
目录1大小为20，包含一个子目录2(大小为10)，子目录2包含子目录3(大小为15)，总的大小为20+10+15=45

示例2：
输入
4 2
4 20 ()
5 30 ()
2 10 (4,5)
1 40 ()
输出
60
说明
目录2包含2个子目录4和

原文链接：https://blog.csdn.net/misayaaaaa/article/details/130981157
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const [m,n] = (await readline()).split(" ").map(Number);
    const folders = [];
    for(let i=0;i<m;i++){
        folders.push((await readline()).split(" "));
    }
    console.log(getRes(m,n,folders));
})()

// 思路：同树状结构查询  层序遍历，找到目标目录的所有子目录,并记录和
function getRes(m,n,folders) {
    console.log(m,n,folders)
//     构造对象map,key为父目录，value为子目录数组
    let faMap = {};
    let sizeMap = {};
    for(let [fa,size,son] of folders){
        // son = JSON.parse(son.replace("(","[").replace(")","]"));
        faMap[fa] = son.slice(1,-1).split(",");
        sizeMap[fa] = parseInt(size);
    }
    // console.log(faMap, sizeMap)
    let sum = sizeMap[n];
//     层序遍历，找到target的所有子目录
    let queue = [n];
    while(queue.length){
        let size = queue.length;
        for(let i=0;i<size;i++) {
            const cur = queue.shift();
            // 如果当前节点有子节点，加入队列
            if (faMap[cur]) {
                for (let v of faMap[cur]) {
                    sum += sizeMap[v] ? sizeMap[v] : 0;
                    queue.push(v);
                }
            }
        }
    }
    return sum;
}