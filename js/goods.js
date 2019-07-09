class PageChange{
    constructor(options){
        this.url = options.url;
        this.goods = options.goods;
        this.pageList = options.pageList;
        this.num = options.num || 20;
        this.index = options.index || 0;
        this.load();
        this.addEvent();
    }
    load(){
        var that = this;
        $.ajax({
            url:this.url,
            success:function(res){
                // console.log(res);
                that.res = res;
                that.displayNum();
            }
        })
    }
    displayNum(){
        var that = this;
        this.pageList.pagination(this.res.length,{  //第一个参数,数据最大个数
            items_per_page:this.num,  //每页显示的条目数
            current_page:this.index,  //当前选中的页面
            callback:function(index){  //回调函数，返回索引下标
                that.index = index;    //保存当前的索引
                that.display();      //渲染页面
            }
        })
    }

    display(){
        var str = "";
        for(var i=this.index*this.num;i<this.num*this.index+this.num;i++){
            if(i<this.res.length){
                str += `<div class="info" goodid="${this.res[i].id}"><div class="info-t"><a href="##"><img src="${this.res[i].src}" alt=""></a></div><div class="info-m"><a href="#">${this.res[i].name}</a></div><div class="info-b"><span>￥<b>${this.res[i].price}</b></span><a href="http://localhost/1905/flower/gooddetail.html" class="buy">点击购买</a></div></div>`;
            }
        }
        this.goods.html(str);
    }
    addEvent(){
        var that = this;
        // console.log(this.goods);
        $(this.goods).click(function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "buy"){
                that.id = target.parentNode.parentNode.getAttribute("goodid");
                console.log(that.id);
        localStorage.setItem("infos",that.id);

        }
        
        // localStorage.setItem("id",that.id);
    })
    
    }
} 
new PageChange({
    url:"http://localhost/1905/flower/data/json/data.json",
    goods:$(".goods"),
    pageList:$("#Pagination"),
    num:20,
    index:0
});