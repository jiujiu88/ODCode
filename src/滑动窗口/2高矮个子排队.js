/*
题目描述
现在有一队小朋友，他们高矮不同，我们以正整数数组表示这一队小朋友的身高，如数组{5,3,1,2,3}。
我们现在希望小朋友排队，以“高”“矮”“高”“矮”顺序排列，每一个“高”位置的小朋友要比相邻的位置高或者相等；每一个“矮”位置的小朋友要比相邻的位置矮或者相等；
要求小朋友们移动的距离和最小，第一个从“高”位开始排，输出最小移动距离即可。
例如，在示范小队{5,3,1,2,3}中，{5, 1, 3, 2, 3}是排序结果。
{5, 2, 3, 1, 3} 虽然也满足“高”“矮”“高”“矮”顺序排列，但小朋友们的移动距离大，所以不是最优结果。
移动距离的定义如下所示：
第二位小朋友移到第三位小朋友后面，移动距离为1，若移动到第四位小朋友后面，移动距离为2；
输入描述
排序前的小朋友，以英文空格的正整数：
4 3 5 7 8

注：小朋友<100个
输出描述
排序后的小朋友，以英文空格分割的正整数：4 3 7 5 8
备注：4（高）3（矮）7（高）5（矮）8（高）， 输出结果为最小移动距离，只有5和7交换了位置，移动距离都是1。
 */

//解法：从第一个小朋友开始，每当遇到不符合要求的排队顺序，就交换位置。最终形成：高矮高矮高。
/*const rl = require("readline").createInterface({
    input : process.stdin
})
rl.on("line",line=>{
    if(line.split(" ").length==0) return [];
    let arr = line.split(" ").map(Number);
    let res = 0;
    for(let k=0;k<arr.length;k++){
        // 奇数轮次，高矮 arr[i]>=arr[i+1] 偶数轮次，矮高 arr[i]<=arr[i+1]
        if(k%2==0){
            // 高的轮次 k=2时，arr[k]为3，比5矮，需互换
            if(arr[k]<arr[k+1]){
                // 互换 arr[k-1]本来就比arr[k]矮，换成arr[k+1]之后更矮，所以不影响之前的顺序
                res++;
                [arr[k],arr[k+1]] = [arr[k+1],arr[k]];
                // 4 1 5 3 2
            }
        }else{
            // 矮的轮次 k=3时 arr[k]为3，比2高，需互换
            if(arr[k]>arr[k+1]){
                // 互换 arr[k-1]本来就比arr[k]高，换成arr[k+1]之后更高，所以不影响之前的顺序
                res++;
                [arr[k],arr[k+1]] = [arr[k+1],arr[k]];
                // 4 1 5 2 3
            }
        }
    }
    console.log(arr.join(" "));
})*/

//解法二 优化
const rl = require("readline").createInterface({
    input : process.stdin
})
rl.on("line",line=>{
    let arr = line.split(" ").map(Number);
    for(let i=0;i<arr.length;i++){
        // 如果是非法参数，返回空数组
        if(isNaN(arr[i])){
            console.log([]);
            return;
        }
        // 偶数轮次，高矮 arr[i]>=arr[i+1] 齐数轮次，矮高 arr[i]<=arr[i+1]
        // 判断是否需要互换
        const needChange = i%2==0?arr[i]<arr[i+1]:arr[i]>arr[i+1];
        if(needChange){
            [arr[i],arr[i+1]] = [arr[i+1],arr[i]];
        }
    }
    console.log(arr.join(" "));
})