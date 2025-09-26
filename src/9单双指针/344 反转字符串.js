const rl = require("readline").createInterface({
    input:process.stdin
})
/*
编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。
不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
示例 1：
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
["o","l","l","h","e","h"]
//["A"," ","m","a","n",","," ","a"," ","p","l","a","n",","," ","a"," ","c","a","n","a","l",":"," ","P","a","n","a","m","a"]
 */
const lines = [];
rl.on("line",line=>{
//     双指针
    let s = JSON.parse(line);
    let slow = -1,fast = s.length;
    while(++slow<--fast){
        [s[slow],s[fast]] = [s[fast],s[slow]]
        // let temp = s[slow];
        // s[slow] = s[fast];
        // s[fast] = temp;
    }
    console.log(s);
})