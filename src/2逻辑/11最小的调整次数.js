/*
题目描述
有一个特异性的双端队列，该队列可以从头部或尾部添加数据，但是只能从头部移出数据。
小A依次执行2n个指令往队列中添加数据和移出数据。其中n个指令是添加数据（可能从头部添加、也可能从尾部添加），依次添加1到n；n个指令是移出数据。
现在要求移除数据的顺序为1到n。
为了满足最后输出的要求，小A可以在任何时候调整队列中数据的顺序。
请问 小A 最少需要调整几次才能够满足移除数据的顺序正好是1到n

输入
5
head add 1
tail add 2
remove
head add 3
tail add 4
head add 5
remove
remove
remove
remove
输出
1
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void (async ()=> {
    const n = parseInt(await readline());
    const arr = [];
    for(let i=0;i<2*n;i++){
        arr.push(await readline());
    }
    console.log(getRes(n,arr));
})()

// 思路：
const getRes = (n,arr)=>{
    let res = 0;
    //  尾部添加时，顺序不变
    let size = 0;
    let isSort = true;
    for(let command of arr){
        if(command.startsWith("head")){
            if(size!=0 && isSort){
                isSort = !isSort;
            }
            size++;
        }else if(command.startsWith("tail")){
            size++;
        }else{
            // 如果数组为空，跳过
            if(size===0) continue;
            // 如果不按顺序，要调整一次
            if(!isSort){
                res++;
                isSort = !isSort;
            }
            size--;
        }
    }
    return res;
}