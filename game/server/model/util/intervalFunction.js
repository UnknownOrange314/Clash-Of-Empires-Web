function IntervalFunction(cy,fun){
    var cycles=cy;
    var num=0;
    this.update=function(data){
        fun(data);
    }

    this.getCycles=function(){
        return cycles;
    }

    this.setCycles=function(cy){
        cycles=cy;
    }
}
