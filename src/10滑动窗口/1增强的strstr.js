/*
请你实现一个增强版的strstr函数，他的功能是使用带有可选段的字符串进行模糊查询。
与strstr函数相同，该函数在源字符串中查找第一次出现目标字符串的位置，并返回相对于源字符串地址的偏移量。
可选段使用"[]"标识，表示该位置可以匹配可选段中的任意一个字符。例如，"a[bc]“表示可以匹配"ab"或"ac”。

输入描述：
输入参数与strstr函数相同，分别为源字符串和目标字符串的指针。

输出描述：
与strstr的不同之处在于，返回的源字符串中匹配子字符串相对于源字符串地址的偏移量（这个偏移量从0开始计算）。如果没有匹配，则返回-1。

补充说明：
源字符串中不包含"[]“，目标字符串中的”[]"会成对出现且不会嵌套。
输入的字符串长度在[1, 100]之间。

示例1：

输入：
abcd
b[cd]
输出：
1
说明：
相当于在源字符串中查找"bc"或"bd"，"bc"相对于"abcd"的偏移量为1。
原文链接：https://blog.csdn.net/wtswts1232/article/details/131634576
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const source = await readline();
    const target = await readline();
    console.log(getRes(source,target));
})()

// 思路：将目标串分层，b[cd]分为两层 b cd 匹配时定长滑窗匹配，用set.has快速判断是否匹配
const getRes = (source,target)=>{
//     先将目标分层
    let res = [];
    let path = [];
    let isOpen = false;
    let set = new Set();
    for(let v of target){
        if(v=="["){
            isOpen = true;
            set = new Set();
        }else if(v=="]"){
            path.push(set);
        }else{
            if(isOpen){
                set.add(v);
            }else{
                path.push(new Set(v));
            }
        }
    }
//     用定长滑窗 长度为path.length
    const k = path.length;
    // console.log(path,k,source.length);
    let i = 0,j=0;
    while(i<source.length && j<k){
        let start = i;
        while(i<source.length && j<k && path[j] && path[j].has(source[i])){
            i++;
            j++;
        }
        // 如果遍历完了，已经完全包含子串了，返回开始下标
        if(j===k){
            return start;
        }
        i++;
    }
    // 如果没找到，则返回-1
    return -1;
}

/*
const rl = require("readline").createInterface({
    input:process.stdin
})
const lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==2){
        const [source,target] = lines;
        function strstr(source,target){
            // 先将target分组，变为层级
            let level = [];
            // set用来保存[]中的值
            let set = new Set();
            // 用来判断是否是[]中的字符
            let isOpen = false;
            for(let v of target){
                if(v=="["){
                    isOpen = true;
                }else if(v=="]"){
                    isOpen = false;
                    level.push(set);
                    set = new Set();
                }else{
                    if(isOpen){
                        set.add(v);
                    }else{
                        level.push(new Set(v));
                    }
                }
            }
            // return level
            for(let i=0;i<source.length;i++){
                let j = 0;
                for(;j<level.length;j++){
                    if(!level[j].has(source[i+j])) {
                        break;
                    }
                }
                if(j==level.length){
                    return i;
                }
            }
            return -1;
        }
        console.log(strstr(source,target))
        lines.length = 0;
    }
})
*/