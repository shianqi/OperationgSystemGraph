/**
 * Created by killer on 2016/12/7.
 */
var FIFO = new Vue({
    el: '#main',
    data:{
        message:'',
        hand: 0,
        maxStack: 4,
        items:[],
        click: function () {
            if(this.message!=''){
                var obj = {
                        text: this.message,
                        value: 1
                    };
                var res = false;
                this.items.forEach(function (item) {
                    if(item.text==this.message){
                        item.value++;
                        res = true;
                    }
                }.bind(this));
                if(!res){
                    if(this.items.length<this.maxStack){
                        this.items.push(obj);
                    }else{
                        this.items.splice(this.hand,1,obj);
                        this.hand = this.hand<this.maxStack-1?this.hand+1:0;
                    }
                }
                this.message='';
            }
        }
    }
});