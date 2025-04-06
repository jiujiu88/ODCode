var maximumLengthSubstring = function(s) {
    // 字母构成，用数组即可
    let map = new Array(26);
    let res = 0;
    let left = 0;
    for(let right=0;right<s.length;right++){
        let b = s[right]-'a';
        map[b]++;
        while(map[b]>2){
            map[s[left++]-'a']--;
        }
        res = Math.max(res,right-left+1);
    }
    return res;
};
console.log(maximumLengthSubstring("bcbbbcba"))