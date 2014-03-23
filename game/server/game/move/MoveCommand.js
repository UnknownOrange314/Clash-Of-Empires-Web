/**
 * Created by Gulu on 3/12/14.
 */
var MoveCommand=function(r1,r2){
    var start=r1;
    var end=r2;
    var speed=1;
    var conflict=false

    this.getConflict=function(){
        return conflict
    }

    this.setConflict=function(con){
        conflict=con
    }

    this.getStart=function(){
        return start
    }

    this.getEnd=function(){
        return end
    }

    this.getSpeed=function(){
        return speed
    }
}

//Create functions using prototype to save memory.
MoveCommand.prototype.execute=function(player){
    var start=this.getStart()
    var end=this.getEnd()
    var attacker=start.getOwner();
    var defender=end.getOwner();
    if(attacker!==defender){
        this.setConflict(true)
        if(Math.random()>0.5){ //Defender hits.
            attacker.removeTroops(start, attacker.getAttackPower(start));
        }
        else{ //Attacker hits.
            defender.removeTroops(end,attacker.getAttackPower(start));
        }
        if(defender.getArmy(end)<=0&Object.keys(defender.getRegions()).length>2){//The enemy is out of troops.
            end.loseHP(attacker.getAttackPower(start));
            if(end.getHP()<=0){
                if(defender.getCapital()!==end){
                    end.setOwner(player);
                }
            }
        }
    }else{
        this.setConflict(false)
    }
    if(start.getOwner()===end.getOwner()){
        player.moveTroops(start,end,this.getSpeed());
    }
}

MoveCommand.prototype.hasConflict=function(){
    return this.getConflict()
}