// 参数传输内容
// ajax({
//     type:"get/post/jsonp",   //传输方式，可选
//     url:"接口地址",            //必传
//     data:{
//         columnName:"回调函数名所在的字段名，如：百度的是cb", //可选，但在jsonp时，必选
//         cb:"随便写一个回调函数名",              //可选，但是在jsonp时，必选
//         success:function(){    //必传
//         },
//         error:function(){      //可选
//         },
//         timeout:10,        //可选，在多久时间内没有收到数据为失败
//         beforeSend:function(){    //可选
//         }
//     }
// });

function ajax(options){
    //必传参数，肯定是对象
    //解析对象的属性
    var {url,type,data,success,error,timeout,beforeSend} = options;
    //成功或失败的状态：0为成功，1为失败
    var code = 1;
    var tt;
    tt = setTimeout(function(){
        if(code == 1){
            xhr = null;
            if(error) error("timeout");
        }
    },timeout)

    //ajax开启之前
    if(beforeSend) beforeSend();

    //默认参数的处理
    type = type || "get";   //默认传输方式为get
    data = data || {};
    timeout = timeout == undefined ? 100 : timeout;   

    //处理数据
    var str = "";
    for(var i in data){
        str = str + `${i}=${data[i]}&`;
    }

    //策略模式
    if(type != "jsonp"){
        //处理get的url
        if(type == "get"){
            var d = new Date();
            url = url + "?" + str + "__xxq=" + d.getTime();
        }

        var xhr = new XMLHttpRequest();
        xhr.open(type,url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                success(xhr.responseText);
                code = 0;
            }else if(xhr.readyState !=4 && xhr.status !=200){
                error(xhr.status);
                clearTimeout(tt);
            }
        }
    }
    //判断传输类型确定传回的数据
    switch(type){
        case "get":
            xhr.send();
        break;
        case "post":
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(str);    
        break;
        case "jsonp":
            var d = new Date();
            url = url + "?" + str + "__xxq=" + d.getTime();
            var script = document.createElement("script");
            script.src = url;
            document.body.appendChild(script);
            window[data[data.columnName]] = function(res){
                success(res);
            }    
        break;
    }
    
}




