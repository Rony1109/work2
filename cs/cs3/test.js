onmessage=function(e){console.log(e)
    var num=e.data;
    var result=0;
    for (var i=0;i<num;i++){
        result=i;

    }

    postMessage('计算完了'+result);
}  