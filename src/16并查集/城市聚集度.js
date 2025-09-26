/*
题目描述：
为了达到新冠疫情精准防控的需要，为了避免全员核酸检测带来的浪费，需要精准圈定可能被感染的人群。现在根据传染病流调以及大数据分析，
得到了每个人之间在时间、空间上是否存在轨迹的交叉。
现在给定一组确诊人员编号（X1，X2，X3....Xn），在所有人当中，找出哪些人需要进行核酸检测，输出需要进行核酸检测的人数。（注意：确诊病例自身不需要再做核酸检测）
需要进行核酸检测的人，是病毒传播链条上的所有人员，即有可能通过确诊病例所能传播到的所有人。
例如：A是确诊病例，A和B有接触、B和C有接触、C和D有接触、D和E有接触，那么B\C\D\E都是需要进行核酸检测的人。

输入描述：
第一行为总人数N
第二行为确诊病例人员编号（确诊病例人员数量<N），用逗号分割
第三行开始，为一个N*N的矩阵，表示每个人员之间是否有接触，0表示没有接触，1表示有接触。

输出描述：
整数：需要做核酸检测的人数
人员编号从0开始
0<N<100

示例1
输入：
5
1,2
1,1,0,1,0
1,1,0,0,0
0,0,1,0,1
1,0,0,1,0
0,0,1,0,1
输出：
3

说明：
编号为1、2号的人员，为确诊病例。1号与0号有接触，0号与3号有接触,4号和2号有接触，因此1号、3号、4号需要进行核酸检测
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const n = parseInt(await readline());
    const sickList = (await readline()).split(",").map(Number);
    const grid = [];
    for(let i=0;i<n;i++){
        grid.push((await readline()).split(",").map(Number));
    }
    console.log(getRes1(n,sickList,grid));
})();

// 思路1：并查集
const getRes = (n,sickList,grid)=>{
    console.log(n,sickList,grid);
//     用并查集
    class UnionFindSet{
        constructor(n){
            this.fa = Array(n).fill(0).map((_,idx)=>idx);
        }
        find(x){
            if(x!=this.fa[x]){
                return this.fa[x] = this.find(this.fa[x]);
            }else{
                return x;
            }
        }
        union(x,y){
            let fa_x = this.find(x);
            let fa_y = this.find(y);
            if(fa_x!==fa_y){
                this.fa[fa_x] = fa_y;
            }
        }
    }
    const ufs = new UnionFindSet(n);
    // 有接触的都进行连通
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j]==1) {
                ufs.union(i, j);
            }
        }
    }
    // 找到确诊病例的连通人数
    let path = new Set();
    for(let v of sickList){
        let fa = ufs.find(v);
        for(let i=0;i<n;i++){
            if(ufs.find(i)===fa){
                path.add(i);
            }
        }
    }
    return path.size-sickList.length;
}

// 思路2：算出所有元素的关联数组，栈初始化为确诊病例，while循环，当找到接触人员时，加入栈中，直到找出所有接触人员。
const getRes1 = (n,sickList,grid)=>{
    // console.log(n,sickList,grid);
    let map = Array(n).fill(0).map(()=>[]);
    // 有接触的都进行连通  只查对角线的一半就行，另外一半是重复的
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j]===1 && i!=j) {
                map[i].push(j);
            }
            // console.log(i,j)
        }
    }
    // console.log(map);
    let res = new Set();
    let stack = [...sickList];
    while(stack.length){
        const cur = stack.pop();
        if(map[cur] && map[cur].length){
            for(let v of map[cur]){
                if(!res.has(v)){
                    res.add(v);
                    stack.push(v);
                }
            }
        }
        // console.log("res",res,"stack",stack)
    }
    return res.size-sickList.length;
}