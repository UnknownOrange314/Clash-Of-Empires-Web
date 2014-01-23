
var MoveCommand=function(r1,r2){

    var start=r1;
    var end=r2;
    var speed=1;

    this.start=function(){
        return start
    }

    this.end=function(){
        return end;
    }

    this.execute=function(player){
        if(player.getArmy(start)>40){
            var sOwn=start.getOwner();
            var eOwn=end.getOwner();
            if(sOwn!==eOwn){
                var dBonus=1.0;
                if(eOwn.getCapital()===end){
                    dBonus=5.0;
                }
                sOwn.removeTroops(start,Math.floor(speed*dBonus));
                eOwn.removeTroops(end,speed);
                if(eOwn.getArmy(end)<=0){//The enemy is out of troops.
                    end.setOwner(player);
                }
            }
            if(start.getOwner()===end.getOwner()){
                player.removeTroops(start,speed);
                player.addTroops(end,speed);
            }
        }
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
        armies[region.hashCode()]=0;
    }

    this.addTroops=function(region,tCount){
        var key=region.hashCode();
        if(!(key in armies)){
            armies[key]=0;
        }
        armies[region.hashCode()]+=tCount;
    }

    this.removeTroops=function(region,tCount){
        if(region.hashCode() in armies){
            armies[region.hashCode()]-=tCount;
        }
    }

    this.getArmy=function(region){
        if((region.hashCode() in armies)){
            return armies[region.hashCode()];
        }
        return "Problem";
    }

    this.buildTroop=function(region){
        armies[region.hashCode()]+=1+Math.floor(Math.random()*8);
    }





    this.moveTroops=function(start,end,ct){
        this.removeTroops(start,ct);
        this.addTroops(end,ct);
    }

    this.getNum=function(){
        return num;
    }



    this.updateState=function(){
        moveCommands=ai(this);
        var speed=1;
        var player=this;
        moveCommands.forEach(function(command){
            command.execute(player);
        });
        this.updateScore();
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