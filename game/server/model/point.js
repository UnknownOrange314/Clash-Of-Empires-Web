function Point(x,y){

    var x=x;
    var y=y;

    this.getX=function(){
        return x;
    }

    this.getY=function(){
        return y;
    }

    this.distance=function(loc){
        return Math.sqrt(Math.pow(loc.getX()-x,2)+Math.pow(loc.getY()-y,2));
    }

}