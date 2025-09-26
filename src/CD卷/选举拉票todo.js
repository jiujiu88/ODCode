/*
现在你要竞选一个县的县长。你去对每一个选民进行了调查。你已经知道每一个人要选的人是谁，以及要花多少钱才能让这个人选你。
现在你想要花最少的钱使得你当上县长。你当选的条件是你的票数比任何一个其它候选人的多（严格的多，不能和他们中最多的相等）。请计算一下最少要花多少钱。

Input
单组测试数据。
第一行有一个整数n (1 ≤ n ≤ 10^5)，表示这个县的选民数目。
接下来有n行，每一行有两个整数ai 和 bi (0 ≤ ai ≤ 10^5; 0 ≤ bi ≤ 10^4)，
表示第i个选民选的是第ai号候选人，想要让他选择自己就要花bi的钱。你是0号候选人（所以，如果一个选民选你的话ai就是0，这个时候bi也肯定是0）。

Output
输出一个整数表示花费的最少的钱。

输入
5
1 2
1 3
1 2
2 1
0 0
Output示例
3
原文链接：https://blog.csdn.net/brucehb/article/details/80740732
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // 选民数量
    const n = parseInt(await readline());

    // tid_costs是一个字典，key为候选人id，value为该候选人名下的选民
    const tid_costs = {};

    // 记录所有选民中最大的改选花费，用于后面构造权值线段树
    let max_cost = 0;

    // 记录自己胜选所需要的花费
    let ans = 0;

    // 获取n行输入
    for (let i = 0; i < n; i++) {
        // 候选人id, 改选自己的花费
        const [tid, cost] = (await readline()).split(" ").map(Number);

        // 如果改选花费为0，则说明选的就是自己
        if (cost == 0) continue;

        // 记录不选自己的选民中最大的改选花费
        max_cost = Math.max(max_cost, cost);

        // ans记录的是自己胜选所需要的花费，初始时，我们假设让所有不选自己的人都改选自己，那么自己就获得所有选票，此时肯定胜选
        ans += cost;

        // tid_costs是一个字典，key为候选人id，value为该候选人名下的选民
        if (!tid_costs[tid]) tid_costs[tid] = [];
        tid_costs[tid].push(cost);
    }

    // scan是扫描线矩阵
    const scan = [];
    for (let costs of Object.values(tid_costs)) {
        costs.sort((a, b) => b - a);

        for (let i = 0; i < costs.length; i++) {
            if (scan.length <= i) scan.push([]);
            scan[i].push(costs[i]);
        }
    }

    // 我手中的票，初始时，假设我们想获得所有票
    let my_ticket_count = n;
    // 获得所有票的花费
    let my_ticket_cost = ans;

    // 构建权值线段树
    const tree = new WSegmentTree(max_cost);

    // 开始扫描
    for (let i = 0; i < scan.length; i++) {
        //  被扫描线扫到的都是每个候选人名下改选花费最大的选民，对于这部分选民，我们放弃
        const line = scan[i];

        for (let cost of line) {
            // 将被放弃的选民的改选费用加入权值线段树，后面如果自己票数不够，还需要复活一些选民
            tree.add(1, 1, max_cost, cost);
            // 由于放弃了这部分选民，因此可以去除他们的改选花费
            my_ticket_cost -= cost;
            // 由于放弃了这部分选民，因此相应票数也要去除
            my_ticket_count -= 1;
        }

        let extra_ticket_cost = 0;
        // 此时其他候选人的选票数为i+1，因此如果我们的选票数my_ticket_count <= i+1，则无法取胜
        if (my_ticket_count <= i + 1) {
            // 我们手中总票数只有达到 i+2 张，才能战胜其他候选人，但是注意 i+2 不能超过总票数n, 因此我们还需要正确额外的 min(i+2, n) - my_ticket_count 张票
            const extra_ticket_count = Math.min(i + 2, n) - my_ticket_count;
            // 高效的求解一组数中的前x小数之和，可以基于权值线段树求解，相当于求解前extra_ticket_count小之和
            extra_ticket_cost = tree.query(1, 1, max_cost, extra_ticket_count);
        }

        // 每轮扫描线扫描后，计算其花费，保留最小花费作为题解
        ans = Math.min(ans, my_ticket_cost + extra_ticket_cost);
    }

    console.log(ans);
})();

// 权值线段树
class WSegmentTree {
    constructor(n) {
        const len = n << 2;
        this.count = new Array(len).fill(0); // 权值树
        this.sum = new Array(len).fill(0); // 和树
    }

    /**
     * 向权值线段树中加入一个数
     * @param {*} k 当前所在的线段树节点的序号
     * @param {*} l 前所在的线段树节点 对应的区间范围的左边界
     * @param {*} r 当前所在的线段树节点 对应的区间范围的右边界
     * @param {*} val 要加入权值线段数的数
     */
    add(k, l, r, val) {
        // 到达叶子节点
        if (l == r) {
            this.count[k] += 1;
            this.sum[k] += val;
            return;
        }

        // 节点k的左子节点序号
        const lson = k << 1; // 相当于 2 * k
        const rson = (k << 1) | 1; // 相当于 2 * k + 1

        // 左子节点对应区间范围[l, mid]
        // 右子节点对应区间范围[mid+1, r]
        const mid = (l + r) >> 1;

        if (val <= mid) {
            // 要加入的数val，在左子节点区间范围内
            this.add(lson, l, mid, val);
        } else {
            // 要加入的数val，在右子节点区间范围内
            this.add(rson, mid + 1, r, val);
        }

        // 回溯统计
        this.count[k] = this.count[lson] + this.count[rson];
        this.sum[k] = this.sum[lson] + this.sum[rson];
    }

    /**
     * 求解前rank小数之和
     * @param {*} k 当前所在的线段树节点的序号
     * @param {*} l 当前所在的线段树节点 对应的区间范围的左边界
     * @param {*} r 当前所在的线段树节点 对应的区间范围的右边界
     * @param {*} rank 求解前rank小数之和的rank值
     * @returns 前rank小数之和
     */
    query(k, l, r, rank) {
        // 到达叶子节点
        if (l == r) {
            return rank * l;
        }

        // 节点k的左子节点序号
        const lson = k << 1;
        // 节点k的右子节点序号
        const rson = (k << 1) | 1;

        // 左子节点对应区间范围[l, mid]
        // 右子节点对应区间范围[mid+1, r]
        const mid = (l + r) >> 1;

        // this.count统计的是某区间范围内元素的数量，这些数量累加起来就是对应元素的排名
        if (this.count[lson] < rank) {
            // 如果左子节点的元素数量 < rank，那么说明前rank个数，还有部分在右子节点中
            return (
                this.sum[lson] + this.query(rson, mid + 1, r, rank - this.count[lson])
            );
        } else if (this.count[lson] > rank) {
            // 如果左子节点的元素数量 > rank，那么说明前rank个数都在左子节点中，需要继续分解
            return this.query(lson, l, mid, rank);
        } else {
            // 如果左子节点元素数量 == rank，那么说明前rank个数就是左子节点内的元素，此时要求前rank小数之和，其实就是this.sum[lson]
            return this.sum[lson];
        }
    }
}