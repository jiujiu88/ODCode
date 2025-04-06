/*
给定一个正整数数组，设为nums，最大为100个成员，求从第一个成员开始，正好走到数组最后一个成员，所使用的最少步骤数。
要求：
第一步必须从第一元素开始，且1<=第一步的步长<len/2;（len为数组的长度，需要自行解析）。
从第二步开始，只能以所在成员的数字走相应的步数，不能多也不能少, 如果目标不可达返回-1，只输出最少的步骤数量。
只能向数组的尾部走，不能往回走。
输入描述
由正整数组成的数组，以空格分隔，数组长度小于100，请自行解析数据数量。
输出描述
正整数，表示最少的步数，如果不存在输出-1
输入	7 5 9 4 2 6 8 3 5 4 3 9
输出	2
输入	1 2 3 7 1 5 9 3 2 1
输出	-1
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
rl.on("line",line=> {
    let arr = line.split(" ").map(Number);
    let res = Infinity;
    for(let i=1;i<arr.length/2;i++){
        // 第一步走到i下标，第二步走到j下标
        let j = i+arr[i];
        // 每次i变化后，step都重新计数
        let step = 2;
        // 如果没走到最后一步，继续走
        while(j<arr.length-1){
            j = j+arr[j];
            step++;
        }
        // 如果刚好走到最后一步
        if(j==arr.length-1){
            res = Math.min(res,step);
        }
    }
    console.log(res==Infinity?-1:res);
})
