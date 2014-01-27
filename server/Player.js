
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
            var sOwn=start.getOwner();
            var eOwn=end.getOwner();
            if(sOwn!==eOwn){
                var dBonus=1.0;
                if(eOwn.getCapital()===end){
                    dBonus=5.0;
                }
                if(Math.random()>0.5){
                    sOwn.removeTroops(start,Math.floor(speed*dBonus));
                }
                else{
                    eOwn.removeTroops(end,speed);
                }
                if(eOwn.getArmy(end)<=0){//The enemy is out of troops.
                    end.setOwner(player);
                }
            }
            if(start.getOwner()===end.getOwner()){
                player.moveTroops(start,end,speed);
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
    Object.keys(regions).forEach(function(r){
        var region=regions[r];
        var eCount=0;
        region.getBorders().forEach(function(border){
            if(border.getOwner()!==player){  //Enemy region that will be attacked.
                var a=new MoveCommand(region,border);
                moveCommands.push(a);
                eCount++;
            }
        });
        if(eCount===0){ //We should not leave troops in interior regions.
            region.getBorders().forEach(function(border){
                var a=new MoveCommand(region,border);
                moveCommands.push(a);

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
    var regions={};
    var score=0;
    var name=""+num;
    var capital=null;
    var moveCommands=[];

    this.exportMoveCommands=function(){
        var data=moveCommands.map(function(command){
            var p1=command.start().getLocation();
            var p2=command.end().getLocation();
            var arr={};
            arr["x1"]=p1.getX();
            arr["y1"]=p1.getY();
            arr["x2"]=p2.getX();
            arr["y2"]=p2.getY();
            return arr;
        });
        return data;
    }
    this.addMoveCommand=function(s,e){
        moveCommands.push(new MoveCommand(s,e));
    }
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
        regions[region.hashCode()]=region;
    }

    this.countRegions=function(){
        return Object.keys(regions).length;
    }
    this.getRegions=function(){
        return regions;
    }

    this.moveTroops=function(r1,r2,mv){
        var ct=Math.min(this.getArmy(r1),mv);
        this.removeTroops(r1,ct);
        this.addTroops(r2,mv);
    }


    this.removeRegion=function(region){
        delete regions[region.hashCode()];
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
            armies[region.hashCode()]-=Math.min(this.getArmy(region),tCount);
        }
    }

    this.getArmy=function(region){
        if((region.hashCode() in armies)){
            return armies[region.hashCode()];
        }
        return 0;
    }

    this.buildTroop=function(region){
        armies[region.hashCode()]+=1+Math.floor(Math.random()*2);
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
        score+=Object.keys(regions).length;
    }

    this.getName=function(){
        return name;
    }

}