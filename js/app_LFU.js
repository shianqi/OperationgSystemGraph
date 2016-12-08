/**
 * Created by killer on 2016/12/5.
 */
var LFU = new Vue({
    el: '#lfu',
    data: {
        message: '',
        items:[],
        click: function () {
            if(this.message!=''){
                var obj = {
                    text: this.message,
                    value: 524288,
                    sty: function () {
                        var list = this.value.toString(2).split('');
                        while (list.length < 20) {
                            list.splice(0, 0, '0');
                        }
                        return list;
                    },
                    stack_val: function () {
                        var list = this.value.toString(2).split('');
                        var num = 0;
                        list.forEach(function (item) {
                            if (item == '1') {
                                num++;
                            }
                        });
                        return num;
                    },
                };
                var res = false;
                this.items.forEach(function (item) {
                    if(item.text == this.message){
                        item.value = item.value>>1;
                        item.value += 524288;
                        res = true;
                    }
                }.bind(this));
                if(!res){
                    var minNubmer = 0;
                    if(this.items.length>3){
                        var min = 999;
                        var nMin = 524289;
                        for(var i = 0;i<this.items.length;i++){
                            if(this.items[i].stack_val()<min){
                                min = this.items[i].stack_val();
                                nMin = this.items[i].value;
                                minNubmer = i;
                            }else if(this.items[i].stack_val()==min){

                                if(this.items[i].value<nMin){
                                    nMin = this.items[i].value;
                                    minNubmer = i;
                                }
                            }
                        }
                        this.items.splice(minNubmer,1,obj);
                    }else{
                        this.items.push(obj);
                    }

                }
                this.message = '';
            }
        },
    },
    mounted: function () {
        setInterval(function(){
            this.items.forEach(function (item) {
                item.value = item.value>>1;
            })
        }.bind(this),500);
    }
});