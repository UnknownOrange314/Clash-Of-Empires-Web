
function Region(x,y,aX,aY,rName,sLoc){

    var myOwner=null;
    var armyLoc=new Point(aX,aY)
    var myLoc=new Point(x,y);
    var borders=[];
    var name=rName;
    var shapeLoc=sLoc;

    var maxHP=1000;
    var curHP=1000;

    this.getAx=function(){
        return aX
    }

    this.getAy=function(){
        return aY
    }

    this.loseHP=function(aStr){
        curHP=Math.max(0,curHP-aStr);
    }

    this.heal=function(){
        curHP=Math.min(1000,curHP+1);
    }

    this.getHP=function(){
        return curHP;
    }

    this.getX=function(){
        return myLoc.getX()
    }

    this.getY=function(){
        return myLoc.getY()
    }
    this.getShapeLoc=function(){
        return shapeLoc;
    }

    this.setName=function(nm){
        name=nm;
    }

    this.getName=function(){
        return name;
    }

    this.addBorder=function(border){
        borders.push(border);
    }

    this.hasBorder=function(other){
        return borders.indexOf(other)!==-1;
    }

    this.getBorders=function(){
        return borders;
    }

    this.getRenderState=function(){
        return new RegionRenderState(myLoc.getX(),myLoc.getY(),myOwner.getNum(),myOwner.getArmy(this),curHP,this.getName());
    }

    this.setOwner=function(owner){
        if(myOwner!==null){
            myOwner.removeRegion(this);
        }
        myOwner=owner;
        owner.addRegion(this);
    }

    this.getOwner=function(){
        return myOwner;
    }

    this.getX=function(){
        return myLoc.getX();
    }

    this.getY=function(){
        return myLoc.getY();
    }



    this.getLocation=function(){
        return myLoc
    }

    this.distance=function(other){
        return myLoc.getDistance(other);
    }

    this.buildTroop=function(){
        myOwner.buildTroop(this);
    }

    /**
     * Generates a string hash for the region for use in dictionaries.
     */
    this.hashCode=function(){
        return myLoc.getX()+":"+myLoc.getY();
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
function RegionRenderState(x,y,owner,army,curHP,name){


    var myX=x;
    var myY=y;
    var myOwner=owner;
    var myArmy=army;
    var hitPoints=curHP;
    var myName=name;

    this.getAx=function(){
        return a_x
    }
    this.getAy=function(){
        return a_y
    }
    this.getName=function(){
        return myName;
    }
    this.getHP=function(){
        return hitPoints;
    }
    this.getArmy=function(){
        return myArmy;
    }

    this.getOwner=function(){
        return myOwner;
    }

    this.getX=function(){
        return myX;
    }

    this.getY=function(){
        return myY;
    }


}