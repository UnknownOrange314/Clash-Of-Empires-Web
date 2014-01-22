
var MoveCommand=function(r1,r2){
    var start=r1;
    var end=r2;

    this.start=function(){
        return start
    }

    this.end=function(){
        return end;
    }
}
/**
 * This is a simple AI function for a computer player to follow.
 * @param player The player that is running the AI.
 * @constructor
 */
var Computer=function(player){
    var moveCommands=[];
    var regions=player.getRegions();
    regions.forEach(function(region){
        var eCount=0;
        region.getBorders().forEach(function(border){
            if(border.getOwner()!==player){  //Enemy region that will be attacked.
                moveCommands.push(new MoveCommand(region,border));
                eCount++;
            }
        });
        if(eCount===0){ //We should not leave troops in interior regions.
            region.getBorders().forEach(function(border){
                moveCommands.push(new MoveCommand(region,border));
            });
        }
    });
    return moveCommands;
}

/**
 * This is an empty updateState function for human players.
 * @constructor
 */
var NoAI=function(player){
    return player.getMoveCommands();
}

function Player(num,ai){

    var armies={};
    var regions=[];
    var score=0;
    var name=""+num;
    var capital=null;
    var moveCommands=[];

    this.getMoveCommands=function(){
        return moveCommands;
    }
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

    this.updateState=function(){
        moveCommands=ai(this);
        var speed=5;
        var player=this;
        moveCommands.forEach(function(command){

            var start=command.start();
            if(player.getArmy(start)>40){
                var end=command.end();
                if(start.getOwner()!==end.getOwner()){
                    start.getOwner().removeTroops(start,speed);
                    end.getOwner().removeTroops(end,speed);
                    if(end.getOwner().getArmy(end)<=0){//The enemy is out of troops.
                        end.setOwner(player);
                    }
                }
                if(start.getOwner()===end.getOwner()){
                    player.removeTroops(start,speed);
                    player.addTroops(end,speed);
                }
            }
        });
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