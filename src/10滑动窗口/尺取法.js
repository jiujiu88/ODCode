// 尺取法  通常是有一个子串str1，和一个父串str2，我们需要在父串str2中找到包含str1子串所有字符的目标串target,不在意字符顺序。
// 滑窗新增处理字符：cnt[c]>0  滑窗删除处理字符：cnt[c]>=0
// 先定义一个total,记录需要满足要求的字符个数,在外侧窗口时,如果符合条件则total-1(count[jc]-->0),缩小窗口时如果退出的元素也是目标元素(count[jc]++>=0),则恢复为total+1.当total==0时记录结果


// 最小覆盖子串
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    let len = t.length;

    const count = {};
    for (let c of t) {
        count[c] ? count[c]++ : (count[c] = 1);
    }

    let i = 0;
    let j = 0;
    let minLen = s.length + 1; // 最短子串的长度
    let start = 0; // 最短子串的起始位置

    while (j < s.length) {
        const jc = s[j];

        if (count[jc]-- > 0) { // 注意：这里count[c]--必须写在if条件中，因为count[jc]可以是负数，但是len不能是负数
            len--;
        }

        while (len === 0) {
            if (minLen > j - i + 1) {
                minLen = j - i + 1;
                start = i;
            }

            const ic = s[i];
            if (count[ic]++ == 0) { // 此时原因请看博客评论区说明
                len++;
            }
            i++;
        }

        j++;
    }
    return minLen < s.length + 1 ? s.substring(start, start + minLen) : "";
};