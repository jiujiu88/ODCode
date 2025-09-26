const rl = require("readline").createInterface({
    input : process.stdin
})
// rl.on("line",line=>{
//     console.log(line)
// })

//     (x1,y1)
//     (x2,y2)
// d1 = x1-x2;
// d2 = y1-y2;
// (x2+d2,y2-d1)  (
// ,y2-x1+x2)
// (x1+d2,y1-d1)  (x1+y1-y2,y1-x1+x2)

let iter = rl[Symbol.asyncIterator]();
const readline = async()=>(await iter.next()).value;
void async function(){
   const n = parseInt(await readline());
   const nums = []
   for(let i =0;i<n;i++){
       nums.push((await readline()));
   }
   console.log(nums)
    function getCoorNum(nums){
       let count = 0;
       const set = new set(nums);
       for(let i=0;i<nums.length;i++){
           let [x1,y1] = nums[i].split(" ").map(Number);
           for(let j=i+1,j<nums.length;j++){
               let [x2,y2] = nums[j].split(" ").map(Number);
               // let x3 = x1-
           }
       }
    }
}()