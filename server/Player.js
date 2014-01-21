/**
 * This is a simple AI function for a computer player to follow.
 * @param player The player that is running the AI.
 * @constructor
 */
var Computer=function(player){

    var regions=player.getRegions();
    for(var i=0;i<regions.length;i++){
        var reg=regions[i];
        var t=player.getArmy(reg);
        var enemy=[];
        var borders=reg.getBorders();
        for(var j=0;j<borders.length;j++){
            var e=borders[j];
            if(e.getOwner()!==player){
                enemy.push(e);
            }
        }
        for(var k=0;k<enemy.length;k++){
            var eReg=enemy[k];
            player.attack(t/enemy.length,eReg);
        }
    }
}

/**
 * This is an empty AI function for human players.
 * @constructor
 */
var NoAI=function(){

}

function Player(num,ai){

    var armies={};
    var regions=[];
    var score=0;
    var name=""+num;
    var capital=null;

    this.setCapital=function(cap){
        capital=cap;
    }
    this.getCapital=function(){
        return capital;
    }
    this.setName=function(nm){
        name=nm;
    }
    this.addRegion=function(region){
        regions.push(region);
    }

    this.getRegions=function(){
        return regions;
    }


    this.removeRegion=function(region){
        regions=regions.splice(regions.indexOf(region),1);
    }

    this.createArmy=function(region){
        armies[region.getX()+region.getY()]=0+Math.floor(Math.random()*7);
    }

    this.addTroops=function(region,tCount){
        armies[region.getX()+region.getY()]+=tCount;
    }

    this.removeTroops=function(region,tCount){
        armies[region.getX()+region.getY()]-=tCount;
    }

    this.getArmy=function(region){
        return armies[region.getX()+region.getY()];
    }

    this.buildTroop=function(region){
        armies[region.getX()+region.getY()]+=1;
    }

    this.fightArmy=function(enemy,region){

        var damageFactor=2;
        if(region==region.getOwner().getCapital()){
            damageFactor=100;
        }
        armies[region.getX()+region.getY()]=armies[region.getX()+region.getY()]-Math.floor(enemy/damageFactor);
    }



    this.moveTroops=function(start,end,ct){
        this.removeTroops(start,ct);
        this.addTroops(end,ct);
    }

    this.getNum=function(){
        return num;
    }

    this.attack=function(tCount,dest){
        dest.getOwner().fightArmy(tCount,dest);
        if(dest.getOwner().getArmy(dest)<=0){
            dest.setOwner(this);

        }

    }

    this.AI=function(){
        ai(this);
    }



    this.getScore=function(){
        return name+":"+score;
    }

    this.updateScore=function(){
        score+=regions.length;
    }

    this.getName=function(){
        return name;
    }

}