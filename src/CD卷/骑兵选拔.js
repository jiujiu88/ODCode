/*
题目描述
骑兵是古代战争中决胜的关键，因此骑兵选拔至关重要。将军认为又高又瘦的人最适合当骑兵。
刚好兵营来了一批人应选骑兵，请你对这些人进行排序，个子高的排在前面，若身高相同，则体重轻的排在前面，若身高体重都一样，则维持原有顺序。

输入描述
第一行输入一个整数 n，代表应选骑兵的人数。n 最大不超过 100000。

之后 n 行，每行两个数，分别是编号 i 的应选人的身高和体重，以空格分隔。i 从 0 开始。

输出描述
输出排序后的应选人编号数组。格式见用例。

用例
输入
4
170 65
170 60
168 65
169 60
输出	[1, 0, 3, 2]
说明	无
————————————————
原文链接：https://blog.csdn.net/qfc_128220/article/details/127417927
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    let list = [];
    for(let i=0;i<n;i++){
        list.push([i,...(await readline()).split(" ")]);
    }
    getRes(list);
})()

// 思路：数组存[下标i,身高，体重]，循环n行，获取[i,...(await readline()).split(" ")]加入数组，身高降序 体重升序，返回map(v=>arr[0])
// 注意：返回值是字符串 用模板字符串`[${表达式}]`
const getRes = (list)=>{
    console.log(list);
    // 身高降序 体重升序
    list.sort((a,b)=>a[1]==b[1]?a[2]-b[2]:b[1]-a[1]);
    // !!!注意：是要返回字符串
    console.log(`[${list.map(v=>v[0]).join(", ")}]`);
    // console.log("["+list.map(v=>v[0]).join(", ")+"]");
}