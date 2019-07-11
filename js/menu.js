// 左侧三级菜单栏
$(".products .bd .item").hover(function(){
	$(this).addClass("layer");
},function(){
	$(this).removeClass("layer");
});

// banner轮播图
$(".banner1").banner({
    aimg:$(".banner1").find("img"),		
    left:$(".banner1").find("#left"),		
    right:$(".banner1").find("#right"),		
    isList:true,			
    autoPlay:true,			
    moveTime:200,			
    index:0			
})
$(".banner2").banner({
    aimg:$(".banner2").find("a"),		
    // left:$(".banner2").find("#left"),		
    // right:$(".banner2").find("#right"),		
    isList:true,			
    autoPlay:false,		
    moveTime:200,			
    index:0			
})

//侧边导航
$(".floor ul").children("li").click(function(){
    var index = $(this).index();
    var iNowFloor = $(".flo").eq(index);
    var t = iNowFloor.offset().top;
    $("html").stop().animate({
        scrollTop:t
    })
})


// 登录注册选项卡
var adiv = document.querySelectorAll(".choice div");
var acont = document.querySelectorAll("#cont .contall");
for(var i=0;i<adiv.length;i++){
    adiv[i].setAttribute("xxq",i);
    adiv[i].onclick = function(){
        for(var j=0;j<adiv.length;j++){
            adiv[j].className = "";
            acont[j].style.display = "none";
        }
        this.className = "active";
        var index = this.getAttribute("xxq");
        acont[index].style.display = "block";
    }
}

// class Login{
//     constructor(){
//         this.login = document.querySelector(".topul .login a");
//         this.init();
//     }
//     init(){
//         this.check = localStorage.getItem("check") ? JSON.parse(localStorage.getItem("check")) : [];
//         this.setData();
//     }
//     setData(){
//         var str = "";
//         for(var i =0;i<this.check.length;i++){
//             str = this.check[i].phone;
//         }
//         this.login.innerHTML = str;
//     }
// }
// new Login;