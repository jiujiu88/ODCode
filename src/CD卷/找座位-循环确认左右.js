/*
题目描述
在一个大型体育场内举办了一场大型活动，由于疫情防控的需要，要求每位观众的必须间隔至少一个空位才允许落座。

现在给出一排观众座位分布图，座位中存在已落座的观众，请计算出，在不移动现有观众座位的情况下，最多还能坐下多少名观众。

输入描述
一个数组，用来标识某一排座位中，每个座位是否已经坐人。0表示该座位没有坐人，1表示该座位已经坐人。

1 ≤ 数组长度 ≤ 10000
输出描述
整数，在不移动现有观众座位的情况下，最多还能坐下多少名观众。

用例1
输入	10001
输出	1
说明	无
用例2
输入	0101
输出	0
说明	无
原文链接：https://blog.csdn.net/banxia_frontend/article/details/134519903
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const list = (await readline()).split("");
    console.log(getRes(list));
})()

// 思路：循环数组，当座位为0时，算出左右是否为空，左边下标为0或值为0，就是空 右边下标为n-1或值为0，就是空。左右都为空就可以坐下，赋值为1，且i++(下个座位左边坐人了，避免运算)
const getRes = (list)=>{
    // console.log(list)
    // 左边和右边都为空，可以坐人
    let res = 0;
    for(let i=0;i<list.length;i++){
        // 如果当前位置没有坐人，判断他的左边和右边都没坐人，就可以坐下
        if(list[i]=="0"){
            let leftEmpty = i==0||list[i-1]=="0";
            let rightEmpty = i==list.length-1||list[i+1]=="0";
            if(leftEmpty && rightEmpty){
                res++;
                list[i] = "1";
                // 下一个位置肯定不能坐人了，i++避免重复判断
                i++;
            }
        }
    }
    return res;
}