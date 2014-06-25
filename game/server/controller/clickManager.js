/**
 * This class processes mouse clicks from the client
 */
function ClickManager(){

    var clickMessages=[]; //Messages that are sent back to the user.
    var clickA=null;
    var clickB=null;

    this.getClickMessages=function(){
        var cLen=clickMessages.length;
        if(cLen>2){
            clickMessages=clickMessages.slice(cLen-2,cLen)
        }
        return clickMessages
    }

    this.clearClicks=function(){
        clickA=null;
        clickB=null;

    }


    /**
     * This function finds the closest region to a point.
     * @param pt
     * @param regions
     * @param dist The maximum distance. Returns null if there are no valid results.
     * @returns {null}
     */
    var findClosestRegion=function(pt,regions,dist){
        var cReg=null
        var cDist=9999
        regions.forEach(function(reg){
            if(reg.distance(pt)<cDist){
                cReg=reg
                cDist=reg.distance(pt)
            }
        });
        return cReg
    }
    /**
     * Processes a click.
     * @param pt The point that was clicked on.
     * @param pName The player that made the click.
     * @param regions A list of regions in the game.
     * @param players A list of players in the game.
     */
    this.processClick=function(pt,pName,regions,players){

        if(clickA==null){
            var reg=findClosestRegion(pt,regions,100)
            if(reg!=null){
                if(reg.getOwner().getName()!=pName){
                    console.log("Owner issue");
                    clickMessages.push("Cannot move troops from region you don't own")
                }else{
                    console.log("Possible clickA");
                    clickA=reg;
                    console.log("ClickA:"+clickA.getName())
                }
            }
        }

        else{
            var cM=this;
            var reg=findClosestRegion(pt,regions,100)
            console.log("Possible click");
            if(reg!=null){
                if(reg!=clickA){
                    //We do not want to set a movement command from an enemy region.
                    if(!(clickA.hasBorder(reg))){
                        clickMessages.push("Cannot move troops to non bordering region")
                    }else{
                        clickB=reg;
                        cM.createMoveCommand(clickA,clickB,pName,players);
                        cM.clearClicks();
                    }
                }else{ //Clear click.
                    clickA=null;
                }
            }
        }
    }

    /**
     * Get the region that has been clicked on.
     */
    this.getClickReg=function(){
        return clickA;
    }

    /**
     * Get the name of the region that has been clicked on.
     * @returns {*}
     */
    this.getFirstClickName=function(){
        if(clickA!==null){
            return clickA.getName();
        }else{
            return "Undefined";
        }
    }

    this.registerPlayer=function(pName,players){
        var reg=false;
        players.forEach(function(p){
            if(p.getAI() instanceof Computer){
                if(reg===false){
                    p.setAI(new NoAI(pName));
                    p.setName(pName)
                    reg=true;
                }
            }
        });
    }

    this.createMoveCommand=function(r1,r2,pName,players){
        players.forEach(function(p){ //Search for the player with the name.
            if(p.getAI().username(p)===pName){
                if(r1.hasBorder(r2)){
                    if(!p.hasMoveCommand(r1,r2)){
                        p.addMoveCommand(r1,r2);
                    }else{ //Delete the move command.
                        p.removeMoveCommand(r1,r2);
                    }
                }
            }
        });
    }


}
