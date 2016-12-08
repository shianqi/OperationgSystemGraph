/**
 * Created by killer on 2016/12/7.
 */
var LRU = new Vue({
    el: '#main',
    data: {
        message:'',
        maxStack: 4,
        oldMax: 0,
        items:[],
        click: function () {
            if(this.message!=''){
                var obj = {
                    text:this.message,
                    time: new Date(),
                    value: this.time
                };
                var res = false;
                this.items.forEach(function (item) {
                    if(item.text==this.message){
                        item.time = new Date();
                        res = true;
                    }
                }.bind(this));
                if(!res){
                    if(this.items.length<this.maxStack){
                        this.items.push(obj);
                    }else{
                        this.items.splice(this.oldMax,1,obj);
                    }
                }
                this.message = '';
            }
        }
    },
    mounted: function () {
        setInterval(function () {
            var newDate = new Date();
            var newDateIndex = 0;
            this.items.forEach(function (item,index) {
                item.value = new Date() - item.time;
                if(item.time<newDate){
                    newDateIndex = index;
                    newDate = item.time;
                }
            });
            this.oldMax = newDateIndex;
            console.log(this.oldMax);
        }.bind(this),1000/30);
    }
});