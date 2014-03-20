
/**
 * Created by Gulu on 3/12/14.
 */
function ArmyData(){

    var armies={}
    var troops=0; //The number of troops that a player has.

    /**
     * The attack power of a player when attacking from a region.
     * @param reg
     */
    this.getAttackPower=function(reg){
        var pow=Math.floor(Math.log(this.getArmy(reg)+2)) //Helps prevent troop buildup.
        return Math.min(this.getArmy(reg),pow);
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
        troops+=tCount
    }

    this.removeTroops=function(region,tCount){
        if(region.hashCode() in armies){
            var rCount=Math.min(this.getArmy(region),tCount)
            armies[region.hashCode()]-=rCount
            troops-=rCount
        }
    }

    this.getArmy=function(region){
        if((region.hashCode() in armies)){
            return armies[region.hashCode()];
        }
        return 0;
    }

    this.getSize=function(){
        return troops;
    }




}
