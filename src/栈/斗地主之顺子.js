/*
在斗地主扑克牌游戏中， 扑克牌由小到大的顺序为：3,4,5,6,7,8,9,10,J,Q,K,A,2，玩家可以出的扑克牌阵型有：单张、对子、顺子、飞机、炸弹等。
其中顺子的出牌规则为：由至少5张由小到大连续递增的扑克牌组成，且不能包含2。
例如：{3,4,5,6,7}、{3,4,5,6,7,8,9,10,J,Q,K,A}都是有效的顺子；而{J,Q,K,A,2}、 {2,3,4,5,6}、{3,4,5,6}、{3,4,5,6,8}等都不是顺子。
给定一个包含 13 张牌的数组，如果有满足出牌规则的顺子，请输出顺子。
如果存在多个顺子，请每行输出一个顺子，且需要按顺子的第一张牌的大小（必须从小到大）依次输出。
如果没有满足出牌规则的顺子，请输出No。
输入描述
13张任意顺序的扑克牌，每张扑克牌数字用空格隔开，每张扑克牌的数字都是合法的，并且不包括大小王：2 9 J 2 3 4 K A 7 9 A 5 6
不需要考虑输入为异常字符的情况
输出描述
组成的顺子，每张扑克牌数字用空格隔开：3 4 5 6 7
输入	2 9 J 2 3 4 K A 7 9 A 5 6
输出	3 4 5 6 7
说明	13张牌中，可以组成的顺子只有1组：3 4 5 6 7。
输入	2 9 J 10 3 4 K A 7 Q A 5 6
输出
3 4 5 6 7
9 10 J Q K A
说明	13张牌中，可以组成2组顺子，从小到大分别为：3 4 5 6 7 和 9 10 J Q K A
输入	2 9 9 9 3 4 K A 10 Q A 5 6
输出	No
 */
const rl = require("readline").createInterface({
    input : process.stdin
})
rl.on("line",line=>{
    let cards = line.split(" ");
    let map = {"J":11,"Q":12,"K":13,"A":14};
    const charge = (x)=>{
        if(map[x]){
            return map[x];
        }else{
            return parseInt(x);
        }
    }
    // 排序
    cards.sort((a,b)=>charge(a)-charge(b));
    // 存多个顺子
    let path = [];
    for(let v of cards){
        // 2 2 3 4 5 6 7 9 9 J K A A
        if(v=="2") continue;
        let isAdd = false;
        for(let i=0;i<path.length;i++){
            let stack = path[i];
            // 如果栈顶数据刚好小1,则加入这个栈
            if(charge(v)-1==charge(stack[stack.length-1])){
                stack.push(v);
                isAdd = true;
                break;
            }
        }
        // 如果没有加入顺子,则新增一个顺子栈
        if(!isAdd){
            path.push([v]);
        }
    }
    path = path.filter(v=>v.length>=5);
    if(path.length) {
        for (let v of path) {
            console.log(v.join(" "))
        }
    }else{
        console.log("No")
    }
})