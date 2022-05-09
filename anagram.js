function anagram(S,R){
    let countS =[];
    let countR =[];
    if(S.length != R.length) return -1;
    for(let i=0;i<S.length;i++){
        countS[S[i]] = 0
        countR[R[i]] = 0;
    }
    for(let i=0;i<S.length;i++){
        if(countS[S[i]] == countR[S[i]]) continue;
        else {
            var flag = 0;
            break;
        }
    }
    if(flag !=0) return 1
    else return -1;
}

console.log(anagram("rescu","secure"));