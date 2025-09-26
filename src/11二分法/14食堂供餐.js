/*
题目描述
某公司员工食堂以盒饭方式供餐。为将员工取餐排队时间降低为0，食堂的供餐速度必须要足够快。
现在需要根据以往员工取餐的统计信息，计算出一个刚好能达成排队时间为0的最低供餐速度。
即，食堂在每个单位时间内必须至少做出多少份盒饭才能满足要求。

输入描述
第1行为一个正整数N，表示食堂开餐时长。1 <= N <= 1000。
第2行为一个正整数M，表示开餐前食堂已经准备好的盒饭份数。pi <= M <= 1000。
第3行为N个正整数，用空格分隔，依次表示开餐时间内按时间顺序每个单位时间进入食堂取餐的人数Pi。1 <=i<= N，0<= Pi<=100。

输出描述
一个整数，能满足题目要求的最低供餐速度(每个单位时间需要做出多少份盒饭)。

每人只取一份盒饭。
需要满足排队时间为0，必须保证取餐员工到达食堂时，食堂库存盒饭数量不少于本次来取餐的人数。
第一个单位时间来取餐的员工只能取开餐前食堂准备好的盒饭。
每个单位时间里制作的盒饭只能供应给后续单位时间来的取餐的员工。
食堂在每个单位时间里制作的盒饭数量是相同的。

示例1
输入
3
14
10 4 5
输出	3
说明	本样例中，总共有3批员工就餐，每批人数分别为10、4、5。
开餐前食堂库存14份。

输入：
1
84
78
输出 0
食堂每个个单位时间至少要做出3份餐饭才能达成排队时间为0的目标。具体情况如下:
第一个单位时间来的10位员工直接从库存取餐。取餐后库存剩余4份盒饭，加上第一个单位时间做出的3份，库存有7份。
第二个单位时间来的4员工从库存的7份中取4份。取餐后库存剩余3份盒饭，加上第二个单位时间做出的3份，库存有6份。
第三个单位时间来的员工从库存的6份中取5份，库存足够。
 　
如果食堂在单位时间只能做出2份餐饭，则情况如下：
第一个单位时间来的10位员工直接从库存取餐。取餐后库存剩余4份盒饭，加上第一个单位时间做出的2份，库存有6份。
第二个单位时间来的4员工从库存的6份中取4份。取餐后库存剩余2份盒饭，加上第二个单位时间做出的2份，库存有4份。
第三个单位时间来的员工需要取5份，但库存只有4份，库存不够。
*/

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const n = parseInt(await readline());
    const m = parseInt(await readline());
    const pi = (await readline()).split(" ").map(Number);
    console.log(getRes(n,m,pi))
}()

// 思路:二分法check：用check方法，检查速度为x时是否可以满足要求，求最小
const getRes = (n,m,pi)=>{
    // !!! 如果只有一个人，直接用库存即可。
    if(n===1) return 0;
    // 最少供餐0，最多sum-m
    const sum = pi.reduce((a,b)=>a+b);
    let left = 0,right = sum-m;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(check(n,m,pi,mid)){
            right = mid - 1;
        }else{
            left = mid + 1;
        }
    }
    return right+1;
}

// 检查速度为x，是否可以满足条件
const check = (n,m,pi,target)=>{
    let remain = m-pi[0];
    for(let i=1;i<n;i++){
        remain +=target;
        if(remain-pi[i]<0){
            return false;
        }else{
            remain -=pi[i];
        }
    }
    return true;
}
