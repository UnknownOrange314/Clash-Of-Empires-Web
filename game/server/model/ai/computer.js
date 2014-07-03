/**
 * Created by Gulu on 3/12/14.
 */

/**
 * This is a simple AI function for a computer player to follow.
 * @param player The player that is running the AI.
 * @constructor
 */
var Computer=function(){


    var findEnemyDist=function(player){
        var distMap={};
        var regions=new HashSet(function(reg){
            return reg.hashCode();
        });
        player.getRegions().forEach(function(reg){
            reg.getBorders().forEach(function(r2){
                if(r2.getOwner()!=player){
                    distMap[reg.hashCode()]=1;
                    regions.push(reg);
                }else{
                }
            });

        });

        var temp=null;
        var dist=2;
        while(true){
            temp=new HashSet(function(reg){
                return reg.hashCode();
            });
            regions.forEach(function(reg){
                reg.getBorders().forEach(function(r2){
                    if(r2.getOwner()==player){
                        if((r2.hashCode() in distMap)==false){
                            temp.push(r2);
                            distMap[r2.hashCode()]=dist;
                        }
                    }
                });
            });
            dist++;
            regions=temp;
            if(regions.size()==0||dist>20){
                //console.log("Distance map:"+Object.keys(distMap).length);
                //console.log(JSON.stringify(distMap));
                return distMap;
            }
        }
    }

    this.run=function(player){

        var distMap=findEnemyDist(player);
        var moveCommands=new HashSet(function(com){
            return com.hashCode()
        });
        var regions=player.getRegions();
        regions.forEach(function(region){
            var eCount=0;
            region.getBorders().forEach(function(border){
                var bOwn=border.getOwner();
                var def=bOwn.getArmy(border);
                var att=player.getArmy(region);

                if(att>def||bOwn==player){  //Enemy region that will be attacked.
                    if(!(border.hashCode() in distMap)){
                        var a=new MoveCommand(region,border);
                        moveCommands.push(a);
                    }
                    else if(distMap[region.hashCode()]>distMap[border.hashCode()]){ //Do not move away from the opponent.
                        var a=new MoveCommand(region,border);
                        moveCommands.push(a);
                    }
                }
            });

        });
        return moveCommands;

    }

    this.username=function(player){
        return player.getName();
    }

}

/**
 * This is a function for human player actions.
 * @param username The name of the player given by the client.
 * @constructor
 */
var NoAI=function(user){

    this.run=function(player){
        return player.getMoveCommands();
    }

    this.username=function(player){
        return user;
    }
}