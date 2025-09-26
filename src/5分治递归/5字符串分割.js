const rl = require("readline").createInterface({
    input:process.stdin
})
rl.on("line",line=>{
    console.log(line)
//     剩一个糖果
    const s = parseInt(line);
    let count = 0;
    let num = s;
    function deal(num,count){
        if(num==1){
            return count;
        }
        // 如果可以对半，直接分
        if(num%2==0){
            return deal(num/2,count+1)
        }else{
            return Math.min(deal(num-1,count+1),deal(num+1,count+1));
        }
    }
    console.log(deal(num,0))
})