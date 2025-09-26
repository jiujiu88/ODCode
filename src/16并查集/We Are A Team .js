/*
题目描述
总共有n个人在机房，每个人有一个标号（1<=标号<=n），他们分成了多个团队。题目要求根据收到的m条消息判定指定的两个人是否在一个团队中。
具体规则如下：
消息构成为abc，整数a、b分别代表两个人的标号，整数c代表指令。
c==0：代表a和b在一个团队内。
c==1：代表需要判定a和b的关系。如果a和b是一个团队，输出一行“we are a team”；如果不是，输出一行“we are not a team”。
c为其他值，或当前行a或b超出1~n的范围，输出“da pian zi”。

输入描述
第一行包含两个整数n和m（1<=n, m<100000），分别表示有n个人和m条消息。
随后的m行，每行一条消息，消息格式为abc（1<=a, b<=n, 0<=c<=1）。

输出描述
c==1时，根据a和b是否在一个团队中输出一行字符串。在一个团队中输出“we are a team”，不在一个团队中输出“we are not a team”。
c为其他值，或当前行a或b的标号小于1或者大于n时，输出字符串“da pian zi”。
如果第一行n和m的值超出约定的范围时，输出字符串“NULL”。

用例
输入
5 7
1 2 0
4 5 0
2 3 0
1 2 1
2 3 1
4 5 1
1 5 1
输出
we are a team
we are a team
we are a team
we are not a team
说明
无

输入
5 6
1 2 0
1 2 1
1 5 0
2 3 1
2 5 1
1 3 2
输出
we are a team
we are not a team
we are a team
da pian zi
说明
无

原文链接：https://blog.csdn.net/lbp0123456/article/details/143178268
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