const rl = require("readline").createInterface({
    input : process.stdin
})
// rl.on("line",line=>{
//     console.log(line)
// })
let iter = rl[Symbol.asyncIterator]();
const readline = async()=>(await iter.next()).value;
void async function(){
   const n = parseInt(await readline());
   const pizza = []
   for(let i =0;i<n;i++){
       pizza.push(parseInt(await readline()))
   }
   console.log(pizza)
//     方法1
//     递归  参数，拿披萨，左边和右边，防止越界，每次返回比较最大值
    const cache = new Array(n).fill(0).map(()=>new Array(n).fill(0))
//     避免出界
    function check(idx){
       if(idx<0){
           idx = n-1;
       }else if(idx>n-1){
           idx = 0;
       }
       return idx;
    }
    // 拿披萨
    function getPizza(l,r){
       // 别人拿走左边，左边下标-1
       if(pizza[l]>pizza[r]){
           l = check(l-1);
       }else{
           // 拿走右边，右边下标+1
           r = check(r+1);
       }
       if(cache[l][r]>0){
           return cache[l][r];
       }
       // 最后一块 ，本人拿
       if(l==r){
           cache[l][r] = pizza[l];
       }else{
           // 比较拿左边和右边披萨
           cache[l][r] = Math.max(getPizza(check(l-1),r)+pizza[l],getPizza(l,check(r+1))+pizza[r])
       }
       return cache[l][r];
    }
    let res = 0;
    for(let i =0;i<n;i++){
        res = Math.max(res,pizza[i]+getPizza(check(i-1),check(i+1)))
    }
    console.log(res,cache)
}()