const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const n = parseInt(await readline());
    const m  = parseInt(await readline());
    console.log(getRes(n,m));
})()

const getRes = (n,m)=>{
//     n位数 和等于个位数的n次方
    if(n<3 || n>7 || m<0){
        return -1;
    }
    let count = 0;
    let powR = {};
//     提前算好个位数的n次方
    for(let i=0;i<=9;i++){
        powR[i] = Math.pow(i,n);
    }
//     进行暴力枚举 计算n位数的最小和最大值
    let min = Math.pow(10,n-1);
    let max = Math.pow(10,n);
    const getSum = (n,i,sum)=>{
        for(let v of i+""){
            sum += powR[v];
        }
        return sum;
    }
    // i的范围min~max-1
    // console.log(min,max);
    for(let i=min;i<max;i++){
        if(i==getSum(n,i,0)){
            // console.log(i);
            if(m==count){
                return i;
            }
            count++;
        }
    }
}