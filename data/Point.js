function Point(x,y){
    this.x=x;
    this.y=y;

    this.getX=function(){
        return this.x;
    }

    this.getY=function(){
        return this.y;
    }

    this.getDistance=function(loc){
        return Math.sqrt(Math.pow(loc.getX()-this.x,2)+Math.pow(loc.getY()-this.y,2));
    }

}