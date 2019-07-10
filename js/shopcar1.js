class ShopCar1{
    constructor(options){
        this.url = options.url;
        this.pay = options.pay;
        this.like = options.like;
        this.jianshu = options.jianshu;
        this.heji = options.heji;
        this.init();
    }
    init(){
        var that = this;
        ajax({
            url:this.url,
            success:function(res){
                // console.log(res);
                that.res = JSON.parse(res);
                // console.log(that.res);
                that.getData();
            }
        })
    }
    getData(){
        // console.log(localStorage.getItem("buyinfo"))
        this.buyinfos = localStorage.getItem("buyinfo") ? JSON.parse(localStorage.getItem("buyinfo")) : [];
       
        // console.log(this.buyinfos);
        this.display();
        this.addEvent();
    }
    display(){
        var str = "";
            for(var j=0;j<this.buyinfos.length;j++){
            str += ` <div class="listinfo" index="${this.buyinfos[j].id}"><img src="${this.res[this.buyinfos[j].id].src}" alt="">
            <a href="#">${this.res[this.buyinfos[j].id].name}</a>
            <span class="danjia">${this.res[this.buyinfos[j].id].price}</span>
            <input type="number" min="1" class="num" value="${this.buyinfos[j].buynum}">
            <span class="total">${this.res[this.buyinfos[j].id].price * this.buyinfos[j].buynum}</span>
            <b class="delete">×</b></div>`;
        }

        this.pay.innerHTML = str;
        var stt = "";
        for(var i=0;i<4;i++){
            stt += `<div class="info" goodid="${this.res[i].id}"><div class="info-t"><a href="##"><img src="${this.res[i].src}" alt=""></a></div><div class="info-m"><a href="#">${this.res[i].name}</a></div><div class="info-b"><span>￥<b>${this.res[i].price}</b></span><a href="http://localhost/1905/flower/gooddetail.html" class="buy">点击购买</a></div></div>`;
        }
        this.like.innerHTML = stt;
    }
    addEvent(){

            //统计购物车有几件商品
            // var s = 0;
            // for(var i=0;i<this.buyinfos.length;i++){
            //      s += parseInt(this.buyinfos[i].buynum); 
            // }
            // this.jianshu.innerHTML = s;
            //事件委托，找到当前改变的数据，渲染其他数据
            var that = this;
            this.pay.onchange = function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "num"){
                    that.num = target.value; 
                    // console.log(target.previousSibling.previousSibling.innerHTML);
                    //每个产品的小计
                    target.nextSibling.nextSibling.innerHTML = that.num * parseInt(target.previousSibling.previousSibling.innerHTML);
                    // console.log(that.num);
                    //事件委托时重新遍历数据，拿到新的数据，渲染总价
                    var m = 0;
                    for(var i=0;i<total.length;i++){
                        // console.log(parseInt(total[i].innerHTML));
                        m += parseInt(total[i].innerHTML);
                    }
                    that.heji.innerHTML = m;
                    // var n = 0;
                    // for(var i=0;i<that.num.length;i++){
                    //     console.log(parseInt(target.value));
                    //     // n += parseInt(target.value);
                    // }
                    // that.jianshu.innerHTML = n;
                }
                
            }
            var that = this; 
            var total = document.querySelectorAll(".total");
            //当页面没有发生事件委托时，总价数据的渲染
            function Heji(){
                var s = 0;
                // console.log(total);
                for(var i=0;i<total.length;i++){
                    // console.log(parseInt(total[i].innerHTML));
                    s += parseInt(total[i].innerHTML);
                }
                // console.log(s);
                that.heji.innerHTML = s;
            }
            Heji();
            this.delete();
    }
    delete(){
        var that = this;
        // var listinfo = document.querySelectorAll(".listinfo");
        this.pay.onclick = function(eve){
            var e = eve || window.event;
            var t = e.target || e.srcElement;
            if(t.className == "delete"){
                // listinfo.remove(); 
                // console.log( t.parentNode.getAtrribute("index"));
                that.id = t.parentNode.getAttribute("index");
                console.log(that.id);
                t.parentNode.remove();
                that.removeData();
            }
        }
    }
    removeData(){
        // console.log(this.res);
        // console.log(this.goods);
        for(var i=0;i<this.buyinfos.length;i++){
            if(this.id == this.buyinfos[i].id){
                this.buyinfos.splice(i,1);
            }
        }
        localStorage.setItem("buyinfo",JSON.stringify(this.buyinfos));
    }
}
new ShopCar1({
    url:"http://localhost/1905/flower/data/json/data.json",
    pay:document.querySelector(".pay"),
    like:document.querySelector(".like-bottom"),
    heji:document.querySelector(".gobuy b s"),
    jianshu:document.querySelector(".gobuy span s")
});