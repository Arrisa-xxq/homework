class Mirro{
    constructor(){
        this.sbox = document.querySelector(".details .imgbox");
        this.bbox = document.querySelector(".details .simgbox");
        this.bimg = document.querySelector(".details .simgbox img");
        this.movesp = document.querySelector(".details .imgbox span");                
        // this.init();
        this.addEvent();
    };
    init(){
        this.movesp.style.width = this.bbox.offsetWidth / this.bimg.offsetWidth * this.sbox.offsetWidth + "px";
        this.movesp.style.height = this.bbox.offsetHeight / this.bimg.offsetHeight * this.sbox.offsetHeight + "px";
    };
    addEvent(){
        var that = this;
        this.sbox.addEventListener("mouseover",function(){
            that.over();
            that.init();
        });
        this.sbox.addEventListener("mouseout",function(){
            that.out();
        });
        this.sbox.addEventListener("mousemove",function(eve){
            var e = eve || window.event;
            that.move(e);
        });
    };
    over(){
        this.movesp.style.display = "block";
        this.bbox.style.display = "block";
    };
    out(){
        
        this.movesp.style.display = "none";
        this.bbox.style.display = "none";
    };
    move(e){
        var l =  e.clientX - this.sbox.offsetLeft - this.movesp.offsetWidth;
        var t =  e.clientY - this.sbox.offsetTop - this.movesp.offsetHeight/2;

        if(l<0){
            l = 0;
        }else if(l > this.sbox.offsetWidth - this.movesp.offsetWidth){
            l = this.sbox.offsetWidth - this.movesp.offsetWidth;
        }
        if(t<0){
            t = 0;
        }else if(t > this.sbox.offsetHeight - this.movesp.offsetHeight){
            t = this.sbox.offsetHeight - this.movesp.offsetHeight;
        }
        this.movesp.style.left = l + "px";
        this.movesp.style.top = t + "px";

        var x = l / (this.sbox.offsetWidth - this.movesp.offsetWidth);
        var y = t / (this.sbox.offsetHeight - this.movesp.offsetHeight);
        this.bimg.style.left = -x * (this.bimg.offsetWidth - this.bbox.offsetWidth) + "px";
        this.bimg.style.top = -y * (this.bimg.offsetHeight - this.bbox.offsetHeight) + "px";
        // console.log(this.bimg.style.left,this.bimg.style.top);

        }
    }
    // onload = function(){
    //     new Mirro();
    // }

class goodDetail{
    constructor(options){
        this.url = options.url;
        this.top = options.top;
        this.init();
        
    }
    init(){
        var that = this;
        ajax({
            type:"post",
            url:this.url,
            success:function(res){
                // console.log(res);
                that.res = JSON.parse(res);
                // console.log(that.res);
                
                that.getData();
                new Mirro();
            }
        })
    }
    getData(){
        this.infos = localStorage.getItem("infos") ? JSON.parse(localStorage.getItem("infos")) : [];
        // console.log(this.infos);
        this.display();
        this.addEvent();
    }
    addEvent(){
        var that = this;
        this.top.onchange = function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "buynum"){
                // console.log(that.infos);
                // console.log(buynum.value);
                that.value = parseInt(target.value);
                // console.log(that.value);
            }
        }
        this.top.onclick = function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "addcar"){
               
                this.buyinfo = localStorage.getItem("buyinfo");
                if(this.buyinfo){
                    var onoff = true;
                    this.buyinfo = JSON.parse(this.buyinfo); 
                    console.log(that.infos);
                    // console.log(that.value);
                    for(var i=0;i<this.buyinfo.length;i++){
                        if(this.buyinfo[i].id == that.infos){
                            // this.buyinfo[i].num ++;
                            // onoff = false;
                            // console.log(this.goods[i].id);
                            this.buyinfo[i].buynum = this.buyinfo[i].buynum + that.value;
                            onoff = false;
                        }
                    }
                    if(onoff){
                        this.buyinfo.push({
                            id:that.infos,
                            buynum:that.value
                        })
                    }
                }else{
                    this.buyinfo = [{
                        id:that.infos,
                        buynum:that.value
                    }]
                }
                localStorage.setItem("buyinfo",JSON.stringify(this.buyinfo));
            }
        }
    }
    display(){
        var str = "";
        for(var i=0;i<this.res.length;i++){
                if(this.res[i].id == this.infos){
                    str = `<div class="imgbox">
                    <a><img src="${this.res[i].src}" alt=""></a>
                    <span></span>
                </div>
                <div class="simgbox">
                    <img src="${this.res[i].src}" alt="">
                </div>
                <div class="contbox">
                    <div class="title-box">
                        <div class="name-row">
                            <div class="pnum">商品编号：${this.res[i].id}</div>
                            <div class="tit ellipsis">
                                ${this.res[i].name}
                            </div>
                        </div>
                        <div class="pub ellipsis">${this.res[i].tese}</div>
                    </div>
                    <div class="price-box">
                        <div class="defbox">
                            <div class="op">
                                订花价格：<span class="num">${this.res[i].price}</span>
                            </div>
                            <div class="mp">
                                市场价格：<span class="num">${this.res[i].yuanjia}</span>
                            </div>
                        </div>
                    </div>
                    <dl class="row-info">
                        <dt class="k">鲜花花材：</dt>
                        <dd class="v">${this.res[i].huacai}</dd>
                    </dl>
                    <dl class="row-info">
                        <dt class="k">鲜花包装：</dt>
                        <dd class="v">${this.res[i].packing}</dd>
                    </dl>
                    <dl class="row-info">
                        <dt class="k">鲜花花语：</dt>
                        <dd class="v">${this.res[i].huayu}</dd>
                    </dl>
                    <dl class="row-info">
                        <dt class="k">鲜花附送：</dt>
                        <dd class="v">${this.res[i].gift}</dd>
                    </dl>
                    <dl class="row-info">
                        <dt class="k">配送区域：</dt>
                        <dd class="v">${this.res[i].delivery}</dd>
                    </dl>
                    <dl class="row-info">
                        <dt class="k">备注：</dt>
                        <dd class="v">
                            <span class="lh">${this.res[i].remarks}</span>
                        </dd>
                    </dl>
                    <dl class="row-info">
                        <dt class="k">小贴士：</dt>
                        <dd class="v">${this.res[i].tips}</dd>
                    </dl>
                    <div class="inps">
                        <div class="count">
                            <input type="number" class="buynum" min="0" value="0">
                        </div>
                        <a class="addcar" href="http://localhost/1905/flower/shopcar1.html">加入购物车</a>
                        <a class="buy">立即购买</a>
                    </div>
                    <div class="consult">
                        <div class="left">
                            <div class="phone">
                                <img src="img/phone.png" alt="">
                            </div>
                            <div class="cnt">
                                <div class="tit">心意鲜花网全国客服热线</div>
                                <div class="tel">010-60777792</div>
                            </div>
                        </div>
                        <div class="right">
                            <a href="#" class="qq"><img src="img/qq.jpg" alt=""><span>QQ咨询</span></a>
                            <a href="#" class="kefu"><img src="img/kefu.png" alt=""><span>在线客服</span></a>
                            <a href="#" class="wechat">
                                <img src="img/wecgat.jpg" alt=""><span>
                            微信咨询</span></a>
                        </div>
                    </div>
            </div>
            </div>`;
                }
                this.top.innerHTML = str;
            
        }
    }
}
new goodDetail({
    url:"http://localhost/1905/flower/data/json/gooddetail.json",
    top:document.querySelector(".top")
});

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