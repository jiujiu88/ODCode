/*
输入一串数字后，通过数字和字母的对应关系可以得到多个字母字符串（要求按照数字的顺序组合字母字符串）；
屏蔽字符串：屏蔽字符串中的所有字母不能同时在输出的字符串出现，如屏蔽字符串是abc，则要求字符串中不能同时出现a,b,c，但是允许同时出现a,b或a,c或b,c等；
给定一个数字字符串和一个屏蔽字符串，输出所有可能的字符组合；
例如输入数字字符串78和屏蔽字符串ux，输出结果为uw，vw，vx；数字字符串78，可以得到如下字符串uw，ux，vw，vx；由于ux是屏蔽字符串，因此排除ux，最终的输出是uw，vw，vx;
每个数字关联多个字母，关联关系如下：
0 关联 “a”,”b”,”c”
1 关联 “d”,”e”,”f”
2 关联 “g”,”h”,”i”
3 关联 “j”,”k”,”l”
4 关联 “m”,”n”,”o”
5 关联 “p”,”q”,”r”
6 关联 “s”,”t”
7 关联 “u”,”v”
8 关联 “w”,”x”
9 关联 “y”,”z”
输入描述
第一行输入为一串数字字符串，数字字符串中的数字不允许重复，数字字符串的长度大于0，小于等于5；
第二行输入是屏蔽字符串，屏蔽字符串的长度一定小于数字字符串的长度，屏蔽字符串中字符不会重复；
输出描述
输出可能的字符串组合
注：字符串之间使用逗号隔开，最后一个字符串后携带逗号
输入	78
ux
输出	uw,vw,vx,
输入
78
x
输出	uw,vw,
 */
// 循环屏蔽字符,如果字符串中同时出现所有屏蔽字符,则需要屏蔽
//全排列  去重
const rl = require("readline").createInterface({
    input:process.stdin
})
let lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==2) {
        let [num, except] = lines;
        let map = {
            "0": "abc",
            "1": "ghi",
            "3": "jkl",
            "4": "mno",
            "5": "pqr",
            "6": "st",
            "7": "uv",
            "8": "wx",
            "9": "yz"
        }
        let res = [];
        let path = [];
        // 循环第index个字符
        const backtracking = (index)=>{
            if(path.length==num.length){
                // 计算屏蔽字符   path字符有字符不在屏蔽字符中,则可以加
                for(let v of except){
                    if(!path.includes(v)){
                        res.push(path.join(""));
                        return;
                    }
                }
                return;
            }
            // num为78,index为0,循环uv
            let arr = map[num[index]];
            // 下一层不能重复
            for(let i=0;i<arr.length;i++){
                path.push(arr[i]);
                backtracking(index+1);
                path.pop();
            }
        }
        backtracking(0,0);
        console.log(res.length? res.join(",")+",":"")
        // let ans = [];
        // // uw ux vw vx
        // for(let v of res){
        //     let flag = false;
        //     for(let x of except){
        //         if(!v.includes(x)){
        //             flag = true;
        //         }
        //     }
        //     if(flag){
        //         ans.push(v);
        //     }
        // }
        // console.log(ans.length? ans.join(",")+",":"")
        lines.length = 0;
    }
})