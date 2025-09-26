/*

 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    let urls = [];
    for(let i=0;i<n;i++){
        urls.push((await readline()).split("/"))
    }
    const [l,target] = (await readline()).split(" ");
    console.log(getRes(n,urls,l,target));
})()


const getRes = (n,urls,l,target)=>{
    console.log(n,urls,l,target);

}