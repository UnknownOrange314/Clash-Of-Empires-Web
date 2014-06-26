function IntervalFunction(cycles,fun){
    var num=0;
    this.update=function(add){
        if(typeof add === 'undefined'){
            num++;
        }else{
            num+=add;
        }
        if(num%cycles-1<0){
            fun();
        }
    }
}
