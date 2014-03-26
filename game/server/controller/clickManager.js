/**
 * This class processes mouse clicks from the client
 */
function ClickManager(){

    var clickMessages=[] //Messages that are sent back to the user.
    clickMessages.push("Nothing")
    var clickA=null;
    var clickB=null;

    this.getClickMessages=function(){
        var cLen=clickMessages.length
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
     * Processes a click.
     * @param pt The point that was clicked on.
     * @param pName The player that made the click.
     * @param regions A list of regions in the game.
     * @param players A list of players in the game.
     */
    this.processClick=function(pt,pName,regions,players){
        if(clickA==null){
            regions.forEach(function(reg){
                if(reg.getName()===pt){
                    console.log(reg.getOwner().getName()+":"+pName)
                    if(reg.getOwner().getName()!=pName){
                        clickMessages.push("Cannot move troops from region you don't own")
                    }else{
                        clickA=reg;
                    }
                }
            });
        }
        else{
            var cM=this;
            regions.forEach(function(reg){
                if(reg.getName()===pt){

                    //We do not want to set a movement command from an enemy region.
                    if(!(clickA.hasBorder(reg))){
                        clickMessages.push("Cannot move troops to non bordering region")
                    }else{
                        clickB=reg;
                        cM.createMoveCommand(clickA,clickB,pName,players);
                        cM.clearClicks();
                    }

                }
            });

        }
    }

    this.getFirstClick=function(){
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
                    p.addMoveCommand(r1,r2);
                }
            }
        });
    }


}
