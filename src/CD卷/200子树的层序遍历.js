/*
题目描述
现在给定一个二叉树的后序遍历序列和中序遍历序列，请还原二叉树，并返回指定节点为根的子树的层序遍历序列。

用例保证后序、中序序列的正确性。
序列中不存在重复元素。
保证指定节点是二叉树中的节点。
输入描述
第一行输入二叉树的节点总数 n，n 不大于50
第二行输入二叉树的后序遍历序列，序列元素之间以空格分割
第三行输入二叉树的层序遍历序列，序列元素之间以空格分割
第四行输入目标节点值
二叉树中的节点值是字符串类型，长度不超过10

输出描述
输出指定节点为根的子树的层序遍历序列，序列元素之间以空格分割

用例
输入
7
c cpp js go c# py java
c js cpp java go py c#
py

输出	py go c#
说明
原文链接：https://blog.csdn.net/qfc_128220/article/details/128192362
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const backTree = (await readline()).split(" ");
    const inTree = (await readline()).split(" ");
    const target = await readline();
    console.log(getRes(n,backTree,inTree,target));
})()


const getRes = (n,backTree,inTree,target)=>{
    // console.log(n,backTree,inTree);
    class TreeNode {
        constructor(val,left,right){
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }
    if(n===0) return "";
    // 记录节点值和子树
    const cache = {};
//     后序  左右中  中序 左中右
//     用递归：可以变成子问题，确认左子树、右子树的后序遍历和中序遍历
    const dfs = (backTree,inTree)=>{
        const n = backTree.length;
        // 如果树长度为0，返回null节点
        if(n===0){
            return null;
        }
        const rootVal = backTree[n-1];
        // console.log(rootVal);
        let inIdx = inTree.indexOf(rootVal);
        // console.log(inIdx);
    //     ！注意下标一定要写对，否则会死循环
    //     找到中序遍历
         let inLeft = inTree.slice(0,inIdx);
         let inRight = inTree.slice(inIdx+1);
         // 找到后序遍历
         let backLeft = backTree.slice(0,inIdx);
         let backRight = backTree.slice(inIdx,n-1);
         // console.log(inLeft,inRight,backLeft,backRight);
         let left = dfs(backLeft,inLeft);
         let right = dfs(backRight,inRight);
         return cache[rootVal] = new TreeNode(rootVal,left,right);
    }
    dfs(backTree,inTree);
    let res = [];
    // 对cache[target]输出层序遍历的结果
    const bfs = (root)=>{
        if(!root) return "";
        let queue = [root];
        while(queue.length){
            let size = queue.length;
            for(let i=0;i<size;i++){
                const cur = queue.shift();
                res.push(cur.val);
                if(cur.left){
                    queue.push(cur.left);
                }
                if(cur.right){
                    queue.push(cur.right);
                }
            }
        }
        return res.join(" ");
    }
    return bfs(cache[target]);
}