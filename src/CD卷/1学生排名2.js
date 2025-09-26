/*
题目描述
中学期末考试结束了，现在已经完成了每个学生的语文、数学、英语、物理、化学成绩的统计，请你计算出每个学生的加权总分。
最后按照加权总分对学生进行排名，加权总分越高，则排名越靠前，若加权总分相同，则按照学生姓名字典序升序。

输入描述
第一行输入学生总数 n，学生总数不大于1000。

第二行依次输入语文、数学、英语、物理、化学的权值。权值可能为小数。

之后 n 行，每行输入如下信息：

学生姓名 语文成绩 数学成绩 英语成绩 物理成绩 化学成绩

成绩均为整数，姓名最长不超过50个字符。

输出描述
输出一行，为排名后的学生姓名列表，以空格分隔

用例
输入
3
1 0.9 0.8 0.7 0.6
liubei 90 100 100 100 100
guanyu 100 100 90 100 100
zhangfei 90 90 100 100 100

输出	guanyu liubei zhangfei
说明	liubei加权总分 = 90*1 +  100*0.9 + 100*0.8 + 100*0.7 + 100*0.6 = 390
guanyu加权总分 = 100*1 + 100*0.9 + 90*0.8 + 100*0.7 + 100*0.6 = 392
zhangfei加权总分 = 90*1 + 90*0.9 + 100*0.8 + 100*0.7 + 100*0.6 = 381
————————————————
原文链接：https://blog.csdn.net/qfc_128220/article/details/134386476
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const xsList = (await readline()).split(" ").map(Number);
    let list = [];
    for(let i=0;i<n;i++){
        list.push((await readline()).split(" "))
    }
    console.log(getRes(list,xsList,n));
})()

// 思路：数组存[name(list.shift()),score(list[i]*xsList[i]))。数组按成绩降序，姓名升序
const getRes = (list,xsList,n)=>{
    // console.log(list,xsList);
    var scoreList = [];
    for(let v of list){
        const name = v.shift();
        let score = 0;
        v = v.map(Number)
        for(let i=0;i<xsList.length;i++){
            score +=xsList[i]*v[i];
        }
        scoreList.push([name,score]);
    }
    // console.log(scoreList)
    // 成绩降序 姓名升序
    scoreList.sort((a,b)=>a[1]==b[1]?a[0]-b[0]:b[1]-a[1]);
    return [...scoreList].map(v=>v[0]).join(" ");
}