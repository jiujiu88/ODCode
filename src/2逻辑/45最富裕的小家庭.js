const rl = require("readline").createInterface({
    input :process.stdin
})
/*
在一颗树中，每个节点代表一个家庭成员，节点的数字表示其个人的财富值，一个节点及其直接相连的子节点被定义为一个小家庭。
现给你一颗树，请计算出最富裕的小家庭的财富和。
输入描述
第一行为一个数 N，表示成员总数，成员编号 1~N。1 ≤ N ≤ 1000
第二行为 N 个空格分隔的数，表示编号 1~N 的成员的财富值。0 ≤ 财富值 ≤ 1000000
接下来 N -1 行，每行两个空格分隔的整数（N1, N2），表示 N1 是 N2 的父节点。
输出描述
最富裕的小家庭的财富和
输入
4
100 200 300 500
1 2
1 3
2 4
输出	700
 */
let iter = rl[Symbol.asyncIterator]();
const readline = async () =>(await iter.next()).value;
void async function(){
   let  n = parseInt(await readline());
   let nums = (await readline()).split(" ").map(Number);
   let tree = [];
   let map = new Map();
   for(let i=0;i<n-1;i++){
       let [father,son] = (await readline()).split(" ").map(Number)
       map.set(father,(map.get(father)||nums[father-1])+nums[son-1])
       // tree.push((await readline()).split(" ").map(Number));
       // // 将子节点的财富加上
       // map.set(tree[i][0],(map.get(tree[i][0])||nums[tree[i][0]-1])+nums[tree[i][1]-1]);
   }
    console.log(Math.max(...map.values()));
}()
/*const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    const n = parseInt(await readline());
    const wealth = (await readline()).split(" ").map(Number);

    // 这里头插一个0，是为了让wealth数组索引对应成员编号 1~N
    wealth.unshift(0);

    const family = [...wealth];

    for (let i = 0; i < n - 1; i++) {
        const [fa, ch] = (await readline()).split(" ").map(Number);
        family[fa] += wealth[ch];
    }

    console.log(Math.max(...family));
})();*/