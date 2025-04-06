/*
有一种简易压缩算法：针对全部由小写英文字母组成的字符串，将其中连续超过两个相同字母的部分压缩为连续个数加该字母，其他部分保持原样不变。
例如：字符串“aaabbccccd”经过压缩成为字符串“3abb4cd”。
请您编写解压函数，根据输入的字符串，判断其是否为合法压缩过的字符串，
若输入合法则输出解压缩后的字符串，否则输出字符串“!error”来报告错误。
输入描述
输入一行，为一个ASCII字符串，长度不会超过100字符，用例保证输出的字符串长度也不会超过100字符。
输出描述
若判断输入为合法的经过压缩后的字符串，则输出压缩前的字符串；
若输入不合法，则输出字符串“!error”。
输入	4dff
输出	ddddff
输入	2dff
输出	!error
输入	4d@A
输出	!error
 */
const rl = require("readline").createInterface({
    input : process.stdin
})
rl.on("line",line=>{
    let str = line;
    const check = (str)=>{
        if(!/^[a-z0-9]+$/.test(str)) return "!error";
        let res = "";
        let num = [];
        // 解压
        for(let i=0;i<str.length;i++){
            let count = 0;
            if(isDigit(str[i])){
                num.push(str[i]);
            }else{
                if(num.length) {
                    let count = parseInt(num.join(""));
                    if(count<=2) return "!error";
                    res += str[i].repeat(count);
                    num = [];
                }else{
                    res +=str[i];
                }
            }
        }
        // 例如3dd 解压再次压缩为4d，返回error  3d4d解压再压缩变为7d
        return yasuo(res)==str?res:"!error";
    }
    const isDigit = (x)=>{
        return x>="0" && x<="9";
    }
    const yasuo = (str)=>{
        let res = "";
        let temp = str[0];
        let count = 1;
        // d
        // deeeef
        for(let i=1;i<=str.length;i++){
            if(temp==str[i]){
                count++;
            }else{
                if(count>2) {
                    res += count+temp;
                }else{
                    res += temp.repeat(count);
                }
                temp = str[i];
                count = 1;
            }
        }
        return res;
    }
    // console.log(yasuo("aeeeddddddddx"))
    console.log(check(str));
})
