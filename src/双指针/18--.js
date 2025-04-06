/*
题目描述
公元2919年，人类终于发现了一颗宜居星球——X星。 现想在X星一片连绵起伏的山脉间建一个天热蓄水库，如何选取水库边界，使蓄水量最大？

要求：

山脉用正整数数组s表示，每个元素代表山脉的高度。
选取山脉上两个点作为蓄水库的边界，则边界内的区域可以蓄水，蓄水量需排除山脉占用的空间
蓄水量的高度为两边界的最小值。
如果出现多个满足条件的边界，应选取距离最近的一组边界。
输出边界下标（从0开始）和最大蓄水量；如果无法蓄水，则返回0，此时不返回边界。

例如，当山脉为s=[3,1,2]时，则选取s[0]和s[2]作为水库边界，则蓄水量为1，此时输出：0 2:1

当山脉s=[3,2,1]时，不存在合理的边界，此时输出：0。

输入描述
一行正整数，用空格隔开，例如输入

1 2 3

表示s=[1,2,3]

输出描述
当存在合理的水库边界时，输出左边界、空格、右边界、英文冒号、蓄水量；例如

0 2:1

当不存在合理的书库边界时，输出0；例如

0

备注
1 ≤ length(s) ≤ 10000
0 ≤ s[i] ≤ 10000
用例1
输入
1 9 6 2 5 4 9 3 7
输出
1 6:19
说明
经过分析，选取s[1]和s[6]，水库蓄水量为19（3+7+4+5）

用例2
输入
1 8 6 2 5 4 8 3 7
输出
1 6:15
说明
经过分析，选取s[1]和s[8]时，水库蓄水量为15；同样选取s[1]和s[6]时，水库蓄水量也为15。由于后者下标距离小（为5），故应选取后者。

用例3
输入
1 2 3
输出
0
说明
不存在合理的水库边界
 */
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    const h = line.split(" ").map(Number);

    console.log(getResult(h));
});

function getResult(h) {
    const n = h.length;

    // left[i] 记录 第 i 个山峰左边的最高山峰
    const left = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        left[i] = Math.max(left[i - 1], h[i - 1]);
    }

    // right[i] 记录 第 i 个山峰右边的最高山峰
    const right = new Array(n).fill(0);
    for (let i = n - 2; i >= 0; i--) {
        right[i] = Math.max(right[i + 1], h[i + 1]);
    }

    // lines[i] 记录 第 i 个山峰的水位线高度
    const lines = new Array(n).fill(0);
    // lineSet记录有哪些水位线
    const lineSet = new Set();
    for (let i = 1; i < n - 1; i++) {
        const water = Math.max(0, Math.min(left[i], right[i]) - h[i]); // water 记录 第 i 个山峰可以储存多少水

        if (water != 0) {
            // 第 i 个山峰的水位线高度
            lines[i] = water + h[i];
            lineSet.add(lines[i]);
        }
    }

    // ans数组含义：[左边界， 右边界， 储水量]
    let ans = [0, 0, 0];

    // 遍历每一个水位线
    for (let line of lineSet) {
        // 满足该水位线的最左侧山峰位置l
        let l = 0;
        while (lines[l] < line || h[l] >= line) {
            l++;
        }

        // 满足该水位线的最右侧山峰位置r
        let r = n - 1;
        while (lines[r] < line || h[r] >= line) {
            r--;
        }

        // 该水位线的总储水量
        let sum = 0;
        for (let i = l; i <= r; i++) {
            sum += Math.max(0, line - h[i]);
        }

        // 记录最大的储水量
        if (sum > ans[2]) {
            ans[0] = l - 1;
            ans[1] = r + 1;
            ans[2] = sum;
        }
        // 如果有多个最多储水量选择，则选择边界山峰距离最短的
        else if (sum == ans[2]) {
            const curDis = r - l + 1;
            const minDis = ans[1] - ans[0] - 1;

            if (curDis < minDis) {
                ans[0] = l - 1;
                ans[1] = r + 1;
            }
        }
    }

    if (ans[2] == 0) return "0";

    return ans[0] + " " + ans[1] + ":" + ans[2];
}