/**
 * Created by killer on 2016/12/7.
 */
var OPT = new Vue({
    el:'#main',
    data: {
        items:[],
        list:[7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1],
        maxStick: 3,
        maxValue: 0,
        breakTimes: 0,
        click: function () {
            var li = this.list.splice(0,1);
            var obj = {
                text: li[0],
                nextTime: function () {
                    for(var i=0;i<this.list.length;i++){
                        if(this.list[i]==li[0]){
                            return i;
                        }
                    }
                    return 999;
                }.bind(this)
            };
            var maxVal = -1;
            var maxInd = -1;
            for(var i=0;i<this.items.length;i++){
                if(this.items[i].nextTime()>maxVal){
                    maxVal = this.items[i].nextTime();
                    maxInd = i;
                }
            }
            this.maxValue = maxInd;
            if(this.items.length<this.maxStick){
                this.items.push(obj);
            }else {
                var res = false;
                this.items.forEach(function (item) {
                    if(item.text==li[0]){
                        res = true;
                    }
                }.bind(this));
                if(!res){
                    this.items.splice(this.maxValue,1,obj);
                    this.breakTimes++;
                    console.log("中断次数："+this.breakTimes);
                }
            }

        }
    }
});