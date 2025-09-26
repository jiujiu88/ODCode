/*
需求如下：
依据用户输入的单词前缀，从已输入的英文语句中联想出用户想输入的单词，按字典序输出联想到的单词序列，
如果联想不到，请输出用户输入的单词前缀。
注意：
英文单词联想时，区分大小写
缩略形式如”don’t”，判定为两个单词，”don”和”t”
输出的单词序列，不能有重复单词，且只能是英文单词，不能有标点符号
输入	I love you
He
输出	He
输入
The furthest distance in the world, Is not between life and death, But when I stand in front of you, Yet you don't know that I love you.
f
输出	front furthest
 */
const rl = require("readline").createInterface({
    input:process.stdin
})
const lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length===2){
        let [words,target] = lines;
        // 字典去重
        words = [...new Set(words.split(/[^a-zA-Z]/))];
        // 判断是否包含目标单词,并排序
        let res = words.filter(v=>v.startsWith(target)).sort();
        console.log(res.length?res.join(" "):target);
        lines.length = 0;
    }
})

