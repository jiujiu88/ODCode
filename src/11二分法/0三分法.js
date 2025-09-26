/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const lines = [];
let n, l, r, a;
rl.on("line", (line) => {
    lines.push(line);

    if (lines.length == 2) {
        [n, l, r] = lines[0].split(" ").map(Number);
        a = lines[1].split(" ").map(Number);
        console.log(getResult());
    }
});

const eps = 1e-5;

function getResult() {
    while (r - l >= eps) {
        let k = (r - l) / 3;
        let ml = l + k;
        let mr = r - k;

        if (f(ml) > f(mr)) r = mr;
        else l = ml;
    }

    return l;
}

function f(x) {
    let ans = 0;
    for (let i = n; i >= 0; i--) {
        ans += Math.pow(x, i) * a[n - i];
    }
    return ans;
}