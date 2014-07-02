
/**
 * This object represents a region in the game.
 * @param x The x coordinate of the region.
 * @param y The y coordinate of the region.
 * @param rName The name of the region.
 * @constructor
 */
function Region(x,y,rName,rSize){

    var size=rSize;
    var myOwner=null;
    var myLoc=new Point(x,y);
    var borders=new HashSet(function(reg){
        return reg.hashCode();
    });

    var name=rName;
    var curHP=Region.maxHP;

    //Create an economy for each region.
    var economy=new Economy();

    /**
     * Upgrades something in the region.
     * @param uCom The upgrade command.
     */
    this.upgrade=function(uCom){
        var owner=this.getOwner();
        if(uCom=="Market"){
            if(economy.getTradeCost()<owner.getMoney()){
                owner.subtractCost(economy.getTradeCost());
                economy.upgradeMarket();
            }
        }
        if(uCom=="University"){
            if(economy.getResearchCost()<owner.getMoney()){
                owner.subtractCost(economy.getResearchCost());
                economy.upgradeResearch();
            }
        }

        if(uCom=="Barracks"){
            if(economy.getBarracksCost()<owner.getMoney()){
                owner.subtractCost(economy.getBarracksCost());
                economy.upgradeBarracks();
            }
        }
    }

    this.getResearch=function(){
        return economy.getResearch();
    }


    this.update=function(){
        economy.growPopulation(myOwner.getCapMul());
    }

    /**
     * This method gets resource income for a city.
     */
    this.getResources=function(){
        return economy.getTax();
    }

    /**
     * @returns {The number of troops that should be produced.}
     */
    this.getRecruitment=function(){
        return 1+economy.getBarracks();
    }

    this.loseHP=function(aStr){
        curHP=Math.max(0,curHP-aStr);
    }

    this.heal=function(){
        curHP=Math.min(Region.maxHP,curHP+1);
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


    this.setName=function(nm){
        name=nm;
    }

    this.getName=function(){
        return name;
    }

    /**
     * Adds a one-way connection.
     * @param border The region that wil be connected to.
     */
    this.addBorder=function(border){
       borders.push(border);
    }

    this.hasBorder=function(other){
        return borders.contains(other);
    }

    this.getBorders=function(){
        return borders;
    }

    this.setOwner=function(owner){
        myOwner=owner;
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
        return myLoc.distance(other);
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

    this.exportState=function(){

        var arr={};
        arr["owner"]=myOwner.getNum();
        arr["xPos"]=myLoc.getX();
        arr["yPos"]=myLoc.getY();
        arr["army"]=myOwner.getArmy(this);
        arr["hitPoints"]=curHP;
        arr["name"]=this.getName();
        arr["economy"]=economy.exportState();
        arr["size"]=size;
        return arr;
    }

}
Region.maxHP=1000;

