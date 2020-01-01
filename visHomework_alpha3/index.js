var param = window.location.search;
function selectedgroup() {
    var arr = [];
    if(param !== ""){
        // console.log("进来了");
        param = param.slice(1);
        let s = param.split(',');
        // console.log(s);
        for (let i = 0; i < s.length/2; i++){
            let temp = [];
            temp.push(parseInt(s[i*2]));
            temp.push(parseInt(s[i*2+1]));
            arr.push(temp);
        }
        // console.log(arr);
    }
    return arr;
}

// perimeters = decodeURI(perimeters.substr(1).split('&')[0]);
