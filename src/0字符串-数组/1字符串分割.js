/*
给定一个非空字符串S，其被N个‘-’分隔成N+1的子串，给定正整数K，要求除第一个子串外，其余的子串每K个字符组成新的子串，并用‘-’分隔。
对于新组成的每一个子串，如果它含有的小写字母比大写字母多，则将这个子串的所有大写字母转换为小写字母；
反之，如果它含有的大写字母比小写字母多，则将这个子串的所有小写字母转换为大写字母；大小写字母的数量相等时，不做转换。

输入描述
输入为两行，第一行为参数K，第二行为字符串S。

输出描述
输出转换后的字符串。

输入
3
12abc-abCABc-4aB@
输出
12abc-abc-ABC-4aB-@
*/

const rl = require("readline").createInterface({
    input : process.stdin
})
let lines = [];
rl.on("line",line=> {
    lines.push(line);
    if(lines.length==2){
        let k = parseInt(lines[0]);
        let s = lines[1];
        let arr = s.split("-");
        // let other = s.slice(arr[0].length+1).replace(/-/g,"");
        // 可简化 用数组的slice
        let other = arr.slice(1).join("");
        let res = [arr[0]];
        for(let i=0;i<other.length;i+=k){
            res.push(convert(other.slice(i,i+k)));
        }
        console.log(res.join("-"));
        lines.length = 0;
    }
})

const convert = (x)=>{
    let lowCount=0,upCount = 0;
    for(let i=0;i<x.length;i++){
        if(x[i]>="a" && x[i]<="z"){
            lowCount++;
        }
        if(x[i]>="A" && x[i]<="Z"){
            upCount++;
        }
    }
    if(lowCount==upCount){
        return x;
    }else{
        return lowCount<upCount ? x.toUpperCase :x.toLowerCase;
    }
}

