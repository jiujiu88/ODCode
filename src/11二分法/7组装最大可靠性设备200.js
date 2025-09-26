/*
题目描述
一个设备由 N 种类型元器件组成（每种类型元器件只需要一个，类型 type 编号从 0~N-1），

每个元器件均有可靠性属性 reliability，可靠性越高的器件其价格 price 越贵。

而设备的可靠性由组成设备的所有器件中可靠性最低的器件决定。

给定预算 S，购买 N 种元器件（每种类型元器件都需要购买一个），在不超过预算的情况下，请给出能够组成的设备的最大可靠性。

输入描述
S N // S总的预算，N元器件的种类

total // 元器件的总数，每种型号的元器件可以有多种;

此后有total行具体器件的数据

type reliability price // type 整数类型，代表元器件的类型编号从 0 ~ N-1; reliabilty 整数类型 ，代表元器件的可靠性; price 整数类型 ，代表元器件的价格

输出描述
符合预算的设备的最大可靠性，如果预算无法买齐 N 种器件，则返回 -1

备注
0 <= S,price <= 10000000
0 <= N <= 100
0 <= type <= N-1
0 <= total <= 100000
0 < reliability <= 100000
用例1
输入
500 3
6
0 80 100
0 90 200
1 50 50
1 70 210
2 50 100
2 60 150
输出
60
说明
预算500，设备需要3种元件组成，方案

类型0的第一个(可靠性80),

类型1的第二个(可靠性70),

类型2的第二个(可靠性60),

可以使设备的可靠性最大 60

用例2
输入
100 1
1
0 90 200
输出
-1
说明
组成设备需要1个元件，但是元件价格大于预算，因此无法组成设备，返回-1
 */


const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async()=>{
    const [S,N] = (await readline()).split(" ").map(Number);
    const total = parseInt(await readline());
    let typeMap = new Map();
    let relList = [];
    for(let i=0;i<total;i++){
        const [type,rel,price] = (await readline()).split(" ").map(Number);
        if(!typeMap.has(type)){
            typeMap.set(type,[]);
        }
        typeMap.get(type).push({rel:rel,price:price});
        relList.push(rel);
    }
    console.log(getRes(typeMap,relList,S,N,total));
})()

const check = (target,typeMap,relList,S,N,total)=>{
    // 每一种必须买一个
    let sum = 0;
    let flag = true;
    for(let [k,v] of typeMap){
        let i=0;
        for(;i<v.length;i++){
            let item = v[i];
            if(item.rel>=target){
                sum +=item.price;
                // 找到了就跳出
                break;
            }
        }
        // 如果循环到最后，还没找到
        if(i==v.length){
            flag = false;
        }
    }
    // 如果每种都可以买到，且最终的价格少于预算，说明这种可行
    return flag && sum<=S;
}
const binarySearch = (typeMap,relList,S,N,total)=>{
    let res = -1;
    let left = 0,right = total-1;
    // 二分查找找到合适的可靠性，check方法检查预算是否足够
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        // 如果预算够，找更大的
        if(check(relList[mid],typeMap,relList,S,N,total)){
            left = mid+1;
            res = relList[mid];
        }else{
            right = mid-1;
        }
    }
    return res;
}
// 可靠性由最低的决定 ，每种类型必须买一个，判断选了之后是否够预算
const getRes = (typeMap,relList,S,N,total)=>{
    // 排序 可靠性升序；相同的可靠性，价格升序（这样可以先取到更便宜的，预算更少，容易check成功）
    for(let [k,v] of typeMap){
        v.sort((a,b)=>a.rel==b.rel?a.price-b.price:a.rel-b.rel);
    }
    relList.sort((a,b)=>a-b);
    // 二分查找可靠性 check是否满足预算，如果满足，取更高的
    // console.log(typeMap,relList)
    return binarySearch(typeMap,relList,S,N,total);
}



























/*
const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const [s,n] = (await readline()).split(" ").map(Number);
    const total = parseInt(await readline());
    // 记录所有可靠性，排序二分找最大的
    let reliabilitys = new Set();
    // 记录每种类型的器件价格和可靠性
    let types = new Array(n).fill(0).map(()=>new Array());
    for(let i=0;i<total;i++){
        const [type,reliability,price] = (await readline()).split(" ").map(Number);
        types[type].push({
            price:price,
            reliability:reliability
        })
        reliabilitys.add(reliability);
    }
    console.log(getRes(reliabilitys,types,total,s,n))
}()

// 思路: 二分法check：先按类型分为数组，按价格可靠性升序排序，可靠性单独记录并排序，二分法找最大的可靠性，check检查预算是否够
const getRes = (reliabilitys,types,total,s,n)=>{
    // 可靠性升序排序  !!!set先转为数组
    reliabilitys = [...reliabilitys].sort((a,b)=>a-b);
    // 每种类型的器件按照价格和可靠性排序
    for(let item of types){
        // 按照可靠性升序排序，如果可靠性相等，价格升序排序，这样找到最合适的可靠性就是最近（少）的价格
        item.sort((a,b)=>a.reliability==b.reliability?a.price-b.price:a.reliability-b.reliability);
    }
    // 可靠性最少为min，最大为max  !!!可靠性已经去重了，因此不能用n-1算最后一位，可能越界
    let left = reliabilitys[0],right = reliabilitys[reliabilitys.length-1];
    let res = -1;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        // 找更大的
        if(check(reliabilitys,types,total,s,n,mid)){
            res = mid;
            left = mid+1;
        }else{
            right = mid-1;
        }
    }
    // res初始化为-1.如果没找到符合的返回-1，找到则直接返回
    return res;
}

// 由于可靠性由可靠性最低的器件决定，因此每个类型的可靠性必须大于等于target，判断预算是否足够
const check = (reliabilitys,types,total,s,n,target)=>{
    let sum = 0;
    let flag = true;
    for(let item of types){
        // 循环每种类型的数组
        let i=0;
        for(;i<item.length;i++){
            if(item[i].reliability>=target){
                sum +=item[i].price;
                break;
            }
        }
        // 如果循环完了没找到大于等于target的，则返回false
        if(i==item.length){
            flag = false;
        }
    }
    // 如果每种类型都找到了可靠性，且预算没有超，表示符合条件
    return flag && sum<=s;
}*/