const rl = require("readline").createInterface({
    input : process.stdin
})
/*
现在有多组整数数组，需要将它们合并成一个新的数组。
合并规则，从每个数组里按顺序取出固定长度的内容合并到新的数组中，取完的内容会删除掉，如果该行不足固定长度或者已经为空，则直接取出剩余部分的内容放到新的数组中，继续下一行。
输入描述
第一行是每次读取的固定长度，0 < 长度 < 10
第二行是整数数组的数目，0 < 数目 < 1000
第3-n行是需要合并的数组，不同的数组用回车换行分隔，数组内部用逗号分隔，最大不超过100个元素。
输出描述
输出一个新的数组，用逗号分隔。
输入
3
2
2,5,6,7,9,5,7
1,7,4,3,4
输出	2,5,6,1,7,4,7,9,5,3,4,7
 */
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    let len = parseInt(await readline());
    let n = parseInt(await readline());
    let arr = [];
    let res = [];
    for(let i=0;i<n;i++){
        arr.push((await readline()).split(",").filter(v=>v).map(Number));
    }
    let end = 0;
    while(end<n) {
        for (let i = 0; i < n; i++) {
            // res.push(arr[i].slice(0 + count * len, len * (count + 1)));
            if (arr[i].length > 0) {
                let subArr = arr[i].splice(0, len);
                res.push(...subArr);
            } else {
                end++;
            }
        }
    }
    console.log(res.join(","));
})()


