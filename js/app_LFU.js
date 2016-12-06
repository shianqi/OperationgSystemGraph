/**
 * Created by killer on 2016/12/5.
 */
var LFU = new Vue({
    el: '#main',
    data: {
        message: '',
        items:[],
        click: function () {
            if(this.message!=''){
                var res = false;
                this.items.forEach(function (item) {
                    if(item.text == this.message){
                        item.value = item.value>>1;
                        item.value += 524288;
                        res = true;
                    }
                }.bind(this));
                if(!res){
                    if(this.items.length>3){
                        var min = 999;
                        var minNumer = 0;
                        for(var i = 0;i<this.items.length;i++){
                            if(this.items[i].stack_val()<min){
                                min = this.items[i].stack_val();
                                minNumer = i;
                            }
                        }
                        this.items.splice(minNumer,1);
                    }
                    this.items.push(
                        {
                            text:this.message,
                            value:524288,
                            sty : function () {

                                var list= this.value.toString(2).split('');
                                while(list.length<20){
                                    list.splice(0,0,'0');
                                }
                                return list;
                            },
                            stack_val: function () {
                                var list = this.value.toString(2).split('');
                                var num = 0;
                                list.forEach(function (item) {
                                    if(item=='1'){
                                        num++;
                                    }
                                });
                                return num;
                            },
                        });
                }
                this.message = '';
            }
        },
    },
    created: function () {
        setInterval(function(){
            this.items.forEach(function (item) {
                item.value = item.value>>1;
            })
        }.bind(this),1000);
    }
});