/*
题目描述
将一个csv格式的数据文件中包含有单元格引用的内容替换为对应单元格内容的实际值。
Comma seprated values（CSV）逗号分隔值，csv格式的数据文件使用逗号作为分隔符将各单位的内容进行分隔。
输入描述
输入只有一行数据，用逗号分隔每个单元格，行尾没有逗号。最多26个单元格，对应编号A-Z。
每个单元格的内容包含字母和数字，以及使用<>分隔的单元格引用，例如：表示引用第一个单元的值。
每个单元格的内容，在替换前和替换后均不超过100个字符。
引用单元格的位置不受限制，运行排在后面的单元格被排在前面的单元格引用。
不存在循环引用的情况，比如下面这种场景是不存在的：
A单元格：aCd8u
B单元格：kAydzqo
不存在多重<>的情况，一个单元格只能引用一个其他单元格。比如下面这种场景是不存在的：
A单元格：aCd8u
B单元格：kAydzqo
C单元格：y<>d
输出描述
输出所有单元格展开的内容，单元格之间用逗号分隔。处理过程中出现错误时，输出字符串“-1”表示出错。

示例1
输入
1,2<A>00
输出
1，2100
说明
第二个单元中有对A单元的引用，A单元格的值为1，替换时，将A单元的内容替代的位置，并和其他内容合并。

示例2
输入
<B>12,1
输出
112,1
说明
第一个单元中有对B单元的引用，B单元格的值为1，替换时，将第二个数据单元的内容替代的位置，并和其他内容合并。

输入
1,2<A>00,<B>23
输出
1,2100,210023

示例3
输入
<B<12,1
输出
-1
说明
第一个单元中有错误的单元格引用方式，输出-1
原文链接：https://blog.csdn.net/banxia_frontend/article/details/134472566
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const list = (await readline()).split(",");
    console.log(getRes(list));
})()


const getRes = (list)=>{
    // 最多26个单元格
    if(list.length>26){
        return -1;
    }
    // 数组第i段的引用为A~Z,例如list[0]就是引用A，其他段使用<A>就相当于要替换成list[0]的值
    // 非贪婪匹配从<到>中间的所有字符（尽可能少匹配）
    const reg = /<.*?>/;
//     递归替换引用的数据
    const change = (i)=>{
        const item = list[i];
        // console.log(item);
        // 当前单元格的引用字母
        // let letter = String.fromCharCode('A'.charCodeAt(0)+i);
        // 匹配结果，返回一个数组
        let matchList = item.match(reg);
        // console.log(matchList);
        // 循环匹配的结果
        while(matchList!=undefined){
            // 匹配到的字符为<A>(A~Z)
            let match = matchList[0];
            // 如果匹配字符长度不为3，不符合条件
            if(match.length!=3){
                return false;
            }
            const fitLetter = match[1];
            // 判断匹配字符是否为A~Z
            if(!(fitLetter>="A" && fitLetter<="Z")){
                return false;
            }
            // 如果引用的单元格索引和当前索引相同，引用自己，不符合条件
            if(fitIndex==i){
                return false;
            }
            // 匹配的list中单元格索引
            let fitIndex = fitLetter.charCodeAt()-'A'.charCodeAt();
            // 索引越界，不符合条件
            if(fitIndex>=list.length){
                return false;
            }
        //     递归 如果引用的单元格，例如<B>sdf1,里面还有引用别的，则把引用的这个也替换掉
            if(!change(fitIndex)){
                return false;
            }
        //     将单元格中的引用部分替换
            list[i] = item.replace(match,list[fitIndex]);
        //     下一个匹配结果  例如单元格为<A>dfs<B>213，则要匹配多次，循环匹配
            matchList = list[i].match(reg);
        }
        return true;
    }
    for(let i=0;i<list.length;i++){
        // 单元格的内容，替换前不超过100字符
        if(list[i].length>100){
            return -1;
        }
        // 传入下标，进行引用替换 ，不符合条件返回false
        if(!change(i)){
            return -1;
        }
        // 单元格的内容，替换后不超过100字符
        if(list[i].length>100){
            return -1;
        }
    //     替换后，每个单元格只包含字母数字 匹配字母数字一个或多个
        if(!/^[0-9A-Za-z]+$/.test(list[i])){
            return -1;
        }
    }
    return list.join(",");
}