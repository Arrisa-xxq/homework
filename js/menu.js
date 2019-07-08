// 左侧三级菜单栏
$(".products .bd .item").hover(function(){
	$(this).addClass("layer");
},function(){
	$(this).removeClass("layer");
});

// banner轮播图
$(".banner1").banner({
    aimg:$(".banner1").find("img"),		//必传
    left:$(".banner1").find("#left"),		//可选,传了有功能，不传没有功能
    right:$(".banner1").find("#right"),		//可选,传了有功能，不传没有功能
    isList:true,			//可选，默认为true
    autoPlay:true,			//可选，默认为true
    moveTime:200,			//可选，默认为200
    index:0			//必传
})
$(".banner2").banner({
    aimg:$(".banner2").find("a"),		//必传
    // left:$(".banner2").find("#left"),		//可选,传了有功能，不传没有功能
    // right:$(".banner2").find("#right"),		//可选,传了有功能，不传没有功能
    isList:true,			//可选，默认为true
    autoPlay:true,			//可选，默认为true
    moveTime:200,			//可选，默认为200
    index:0			//必传
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

