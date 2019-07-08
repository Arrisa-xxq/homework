// 注册验证，注册信息存储
var txt1 = document.querySelector("#form .phone .txt1");
var txt2 = document.querySelector("#form .mima .txt2");
var txt3 = document.querySelector("#form .mima2 .txt3");
var btn1 = document.querySelector("#form .btn1");
var status = 0;
btn1.onclick = function(){
    var reg1 = /^1[3456789]\d{9}$/;
    var reg2 = /^[a-zA-Z]\w{5,17}$/;
    if(txt1.value == "" || txt2.value == "" || txt3.value == ""){
        alert("不能为空");
        status = 0;
        return;
    }else if(!reg1.test(txt1.value)){
        alert("请输入正确的手机格式");
        status = 0;
        return;
    }
    if(!reg2.test(txt2.value)){
        alert("请输入6-18位以字母开头的密码!");
        status = 0;
        return;
    }
    if(txt3.value != txt2.value){
        alert("两次密码输入不一致");
        status = 0;
    }
    var check = localStorage.getItem("check");
    if(check){
        var onoff = true;
        check = JSON.parse(check);
        for(var i = 0;i<check.length;i++){
            if(check[i].phone == txt1.value){
                onoff = false;
                alert("用户已注册");
                txt1.value = "";
                txt2.value = "";
                txt3.value = "";
                return;
            }
        }
        if(onoff){
            check.push({
                phone:txt1.value,
                password:txt2.value
            })
        }
    }else{
        check = [{
            phone:txt1.value,
            password:txt2.value
        }]
        alert("注册成功");
    }
    localStorage.setItem("check",JSON.stringify(check));
    location = "D:/1905/第二阶段项目-心意鲜花/login.html";
    
}
// 登录验证码
var changesp = document.querySelector("#form .lo-cont .check span");
// changesp.innerHTML = Math.round(Math.random()*9000+1000);
function yanzheng(){
    var str = "0123456789abcdefghijklmnopqrstuvwxyz";
    var res = "";
    for(var i=0;i<5;i++){
        res += str[Math.floor(Math.random()*str.length)];
    }
    return res;
}
changesp.innerHTML = yanzheng();
changesp.onclick = function(){
    changesp.innerHTML = yanzheng();
}
//登录
var btn2 = document.querySelector("#form .btn2");

btn2.onclick = function(){
    var code2 = document.querySelector("#form .lo-cont .check .code2");
    var t1 = document.querySelector("#form .lo-cont .txt1");
    var t2 = document.querySelector("#form .lo-cont .txt2");
    console.log(2);
    var reg1 = /^1[3456789]\d{9}$/;
    var reg2 = /^[a-zA-Z]\w{5,17}$/;
    if(t1.value == "" || t2.value == "" || code2.value == ""){
        alert("不能为空");
        status = 0;
        return;
    }else if(!reg1.test(t1.value)){
        alert("请输入正确的手机格式");
        
        status = 0;
        return;
    }else if(!reg2.test(t2.value)){
        alert("请输入6-18位以字母开头的密码!");
        status = 0;
        return;
    }else if(code2.value != changesp.innerHTML){
     
    }

    check = localStorage.getItem("check") ? JSON.parse(localStorage.getItem("check")) : [];
    // console.log(check);    
    for(var i=0;i<check.length;i++){  
        if(check[i].phone == t1.value && check[i].password == t2.value){
            location = "D:/1905/第二阶段项目-心意鲜花/index.html";
            console.log("成功");
            return;
        }
      
    }
}