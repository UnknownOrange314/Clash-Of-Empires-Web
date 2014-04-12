function GameManager(mapGen){

    var time=0;
    var data=mapGen.generateMap();
    var regions=data["regions"];
    var players=data["players"];

    var cManager=new ClickManager()

    //Below are methods for processing input from clients
    this.clearClicks=function(){
        cManager.clearClicks()
    }

    /**
     * This function processes the research commands
     * @param rName The research name.
     */
    this.researchCommand=function(rName){
        console.log(" command");
        players.forEach(function(p){
            if(p.getName()=="Host"){

                p.upgrade(rName);
            }
        })
    }

    /**
     * @param pt
     */
    this.processClick=function(pt,pName){
        cManager.processClick(pt,pName,regions,players)
    }

    this.getFirstClickName=function(){
        return cManager.getFirstClickName()
    }

    this.upgradeCommand=function(uCom){
        var cReg=cManager.getClickReg();
        cReg.upgrade(uCom);


    }

    /**
     * This method registers a player so that input associated
     * with a player can be processed.
     */
    this.registerPlayer=function(pName){
        cManager.registerPlayer(pName,players)
    }

    /**
     * This function sets movement between two regions.
     */
    this.setMovementCommand=function(r1,r2,pName){
        console.log("Players:"+players)
        cManager.createMoveCommand(r1,r2,pName,players)
    }

    this.getRegions=function(){
        return regions;
    }

    this.getPlayers=function(){
        return players;
    }



    /**
     * This method returns information about a region.
     */
    this.getMapInfo=function(){
        var rData={};
        regions.forEach(function(reg){
            var data={};
            data["x"]=reg.getX();
            data["y"]=reg.getY();
            data["aX"]=reg.getAx();
            data["aY"]=reg.getAy();
            rData[reg.getName()]=data
        });
        return rData;
    }


    this.updateState=function(){

        //Perform updateState actions.
        players.forEach(function(player){
            player.updateState();
        });

        //Build troops for each region
        if(time%60==0){
            regions.forEach(function(region){
                region.buildTroop();
            });
            players.forEach(function(player){
                player.updateAI();
            })
        }

        time++;


        var regionState=regions.map(function(reg){
            reg.update(); //Updates state for each region. TODO: Consider refactoring.
            return reg.exportState()
        });


        var capitals={};
        var moveCommands={};
        players.forEach(function(player){
            capitals[player.getAI().username(player)]= player.getCapital().getName();
            moveCommands[player.getAI().username(player)]=player.exportMoveCommands();
        });

        var cMessages=cManager.getClickMessages()
        return {"regionStates":regionState,"moveCommands":moveCommands,"capitals":capitals,"clickMessages":cMessages};
    }

    this.getRegionCount=function(){
        return regions.length;
    }


    this.getPlayerState=function(){
        var data={};
        players.forEach(function(p){
            if(p.powerStatus()==true){ //Ignore minor powers.
                data[p.getAI().username(p)]= p.exportState();
            }
        });
        return data;
    }
}
