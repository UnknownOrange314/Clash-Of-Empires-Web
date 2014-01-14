function Region(x,y,size){
    this.myOwner=Math.floor((Math.random()*3)+1);
    this.myLoc=new Point(x,y);
    this.mySize=size;

    this.borders=new Set();

    this.addBorder=function(border){
        this.borders.add(border)
    }

    this.getRenderState=function(){
        return new RegionRenderState(this.myLoc.getX(),this.myLoc.getY(),this.myOwner,this.mySize);
    }

    this.getOwner=function(){
        return this.myOwner;
    }

    this.getX=function(){
        return this.myLoc.getX();
    }

    this.getY=function(){
        return this.myLoc.getY();
    }

    this.getSize=function(){
        console.log(this.mySize);
        return this.mySize;
    }

    this.getLocation=function(){
        return this.myLoc
    }

    this.distance=function(other){
        return this.myLoc.getDistance(other);
    }

}

/**
 * This object is used to export data about the region that will be rendered.
 * @param x
 * @param y
 * @param owner
 * @param size
 * @constructor
 */
function RegionRenderState(x,y,owner,size){
    this.myX=x;
    this.myY=y;
    this.myOwner=owner;
    this.mySize=size;

    this.getOwner=function(){
        return this.myOwner;
    }

    this.getX=function(){
        return this.myX;
    }

    this.getY=function(){
        return this.myY;
    }

    this.getSize=function(){
        return this.mySize;
    }

}