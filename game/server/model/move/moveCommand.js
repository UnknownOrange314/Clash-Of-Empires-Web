/**
 * This object is used to command troops to move between regions.
 * @param r1 The start region.
 * @param r2 The end region.
 * @constructor
 */
var MoveCommand=function(r1,r2){


    var start=r1;
    var end=r2;
    var conflict=false;//Is an opponent attempting to interfere with this move command.

    /**
     *
     * @returns {boolean} Is there a conflict?
     */
    this.hasConflict=function(){
        return conflict;
    }

    /**
     * This function is called to track if there is a conflict.
     * @param con Is there a conflict?
     */
    this.triggerConflict=function(con){
        conflict=con;
    }

    this.getStart=function(){
        return start;
    }

    this.getEnd=function(){
        return end;
    }

}

MoveCommand.speed=3;

MoveCommand.prototype.hashCode=function(){
    return this.getStart().getName()+":"+this.getEnd().getName();
}


/**
 * Resolves combat and movement for the move command.
 * @param player The player that is making the move command.
 */
MoveCommand.prototype.execute=function(){
    var start=this.getStart();
    var end=this.getEnd();
    var attacker=start.getOwner();
    var defender=end.getOwner();
    if(attacker!==defender){
        this.triggerConflict(true);
        if(Math.random()>0.5){ //Defender hits.
            attacker.removeTroops(start, defender.getDefendPower(end));
        }
        else{ //Attacker hits.
            defender.removeTroops(end,attacker.getAttackPower(start));
        }
        if(defender.getArmy(end)<=0){//The enemy is out of troops.
            end.loseHP(attacker.getAttackPower(start));
            if(end.getHP()<=0){
                attacker.addRegion(end);
            }
        }
    }else{
        this.triggerConflict(false)
    }
    defender=end.getOwner();
    if(attacker===defender){
        attacker.moveTroops(start,end,MoveCommand.speed*attacker.speedMul());
    }
}
