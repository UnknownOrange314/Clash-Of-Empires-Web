/**
 * Created by Gulu on 3/12/14.
 */

/**
 * This is a simple AI function for a computer player to follow.
 * @param player The player that is running the AI.
 * @constructor
 */
var Computer=function(){

    this.run=function(player){

        var moveCommands=[];
        var regions=player.getRegions();
        Object.keys(regions).forEach(function(r){
            var region=regions[r];
            var eCount=0;
            region.getBorders().forEach(function(border){
                var bOwn=border.getOwner();
                if(bOwn!==player){  //Enemy region that will be attacked.
                    var def=bOwn.getArmy(border);
                    var att=player.getArmy(region);
                    if(att>def){
                        var a=new MoveCommand(region,border);
                        moveCommands.push(a);
                        eCount++;
                    }
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