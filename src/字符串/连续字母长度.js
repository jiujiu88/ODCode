/*
给定一个字符串，只包含大写字母，求在包含同一字母的子串中，长度第 k 长的子串的长度，相同字母只取最长的那个子串。
输入描述
第一行有一个子串(1<长度<=100)，只包含大写字母。
第二行为 k的值
输出描述
输出连续出现次数第k多的字母的次数。
输入
AAAAHHHBBCDHHHH
3
输出	2
输入
AABAAA
2
输出	1
 */
// 跟第一个对比
const rl = require("readline").createInterface({
    input : process.stdin
})
const lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==2){
        let [s,k] = [lines[0],parseInt(lines[1])];
        /*let map = new Map();
        let left = 0;
        for(let i=0;i<s.length;i++){
            if(s[left]!=s[i]){
                map.set(s[left]+"_"+left,i-left);
                left = i;
            }
            if(i==s.length-1){
                map.set(s[left]+"_"+left,i-left+1);
            }
        }
        // map排序
        map = new Map(Array.from(map).sort((a,b)=>b[1]-a[1]));
        // 去重 如果有相同的字符，去重
        let set = [];
        for(let v of map.keys()){
            let letter = v.split("_")[0];
            if(set.includes(letter)){
                map.delete(v);
            }else {
                set.push(letter);
            }
        }
        console.log(map.size>k?[...map.values()][k-1]:-1);*/
        let letter = s[0];
        let count = 1;
        let map = {};
        // AAAAHHHBBCDHHHH
        for(let i=1;i<=s.length;i++){
            if(s[i]==letter){
                count++;
            }else{
                if(map[letter]==undefined || map[letter]<count) {
                    map[letter] = count;
                }
                count = 1;
                letter = s[i];
            }
        }
        let arr = Object.values(map).sort((a,b)=>b-a);
        console.log(arr.length>=k?arr[k-1]:-1)
        lines.length = 0;
    }
})