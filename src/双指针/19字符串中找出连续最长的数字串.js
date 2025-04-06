const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const s = await readline();
    console.log(getRes(s));
})()

// 思路：双指针 先确定数字串的左下标，然后移动向右找
const getRes = (s)=>{
    // 结尾加一个字母，方便处理最后的边界情况  例如最后是符合要求的，但是++后越界了，未计算结尾符合的数字串
    s = s+"a";
    // 记录长度
    let len = 0;
    // 记录字符串
    let subS = "";
//     记录小数点的下标
    let dotCnt = 0;
//     获取数字串的起始索引
    let l = getStartIdx(s,0);
    let r = l+1;
    while(r<s.length){
        if(isDigit(s[r])){
            r++;
        }else{
            // 如果之前没出现小数点，且当前是小数点，且后面是数字，可以继续
            if(dotCnt==0 && isDot(s[r]) && r+1<s.length && isDigit(s[r+1])){
                // 设置小数点的下标
                dotCnt = r+1;
                r+=2;
            }else{
                //     记录长度
                if(r-l>=len){
                    len = r-l;
                    subS = s.slice(l,r);
                }
                // !!!如果前面是有小数点，那么要从前面的小数点后面的数字开始算
                if(dotCnt!=0){
                    r = dotCnt;
                }
                // 恢复小数点索引为0
                dotCnt = 0;
                //     重新计算起始索引--如果前面有符合的数字串，需要算上
                l = getStartIdx(s,r);
                r = l+1;
            }
        }
    }
    return subS;
}

// 判断是否为数字
const isDigit = (c)=>{
    return c>='0' && c<='9';
}

// 判断是否为小数点
const isDot = (c)=>{
    return c==='.';
}

// 判断是否为+-符号
const isSymbol = (c)=>{
    return c==='+' || c==='-';
}

// 从i索引开始找到符合数字串的起始位置
const getStartIdx = (s,i)=>{
//     如果是数字，或者为正负符号带数字，则可以做起始位,如果没找到继续向后找 !!!注意边界条件i<s.length
    while(!(isDigit(s[i]) || (isSymbol(s[i]) && i+1<s.length && isDigit(s[i+1]))) && i<s.length){
        i++
    }
    return i;
}