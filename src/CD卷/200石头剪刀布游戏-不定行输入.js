/*
题目描述
石头剪刀布游戏有 3 种出拳形状：石头、剪刀、布。分别用字母 A , B , C 表示。
游戏规则:
出拳形状之间的胜负规则如下： A > B；B > C；C > A；">"左边一个字母，表示相对优势形状。右边一个字母，表示相对劣势形状。
当本场次中有且仅有一种出拳形状优于其它出拳形状，则该形状的玩家是胜利者。否则认为是平局。
当发生平局，没有赢家。有多个胜利者时，同为赢家。

例如 1： 三个玩家出拳分别是A, B, C ，由于出现三方优势循环(即没有任何一方优于其它出拳者)，判断为平局。

例如 2： 两个玩家，出拳分别是 A, B ，出拳 A 的获胜。

例如 3： 三个玩家，出拳全部是 A ，判为平局。

输入描述
在一场游戏中，每个玩家的信息为一行。玩家数量不超过 1000 。每个玩家信息有 2 个字段，用空格隔开：

玩家 ID：一个仅由英文字母和数字组成的字符串
出拳形状：以英文大写字母表示, A 、B 、C 形状。 例：
abc1 A
xyz B
1
2
输出描述
输出为赢家的玩家 ID 列表(一个或多个)，每个 ID 一行，按字符串升序排列。如果没有赢家，输出为"NULL"字符串。
例如：
abc1
1
用例1
输入
abc1 A
xyz B
输出
abc1
说明
A比B有优势，abc1 胜出

用例2
输入
abc1 A
xyz A
输出
NULL
说明
没有优胜的出拳形状，平局

用例3
输入
abc1 A
def A
输出
NULL
原文链接：https://blog.csdn.net/banxia_frontend/article/details/134909498
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 输入输出处理
// 思路:使用map记录key:手势:value:id数组只有一种手势，或者三种手势都有，则平局 ,两种手势,判断手势占优即可
void (async function () {
    const map = new Map();
    while ((line = await readline())) {
        const arr = line.split(" ");
        // 有考友反馈实际考试会出现一行3个字段的情况，此时直接返回NULL即可
        if (arr.length != 2) {
            console.log("NULL");
            return;
        }
        const [player, gesture] = arr;
        // 统计各个手势的人名
        if (!map.has(gesture)) {
            map.set(gesture, []);
        }
        map.get(gesture).push(player);
    }

    switch (map.size) {
        case 1:
        case 3:
            // 只有一种手势，或者三种手势都有，则平局
            console.log("NULL");
            break;
        case 2:
            let ans;

            if (!map.has("A")) {
                // 没有A手势，只有B、C手势，则B赢
                ans = map.get("B");
            } else if (!map.has("B")) {
                // 没有B手势，只有A、C手势，则C赢
                ans = map.get("C");
            } else {
                // 没有C手势，只有A、B手势，则A赢
                ans = map.get("A");
            }

            ans.sort().forEach((a) => console.log(a));
            break;
    }
})();