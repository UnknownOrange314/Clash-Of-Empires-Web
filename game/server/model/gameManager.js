function GameManager(mapGen){

    var time=0;
    var data=mapGen.generateMap();
    var regions=data["regions"];
    var players=data["players"];
    var cManager=new ClickManager();

    var aiTimer=new IntervalFunction(60,function(){
        players.forEach(function(player){
            player.updateAI();
        })
    });

    var recruitTimer=new IntervalFunction(60,function(){
        regions.forEach(function(region){
            region.buildTroop();
        });
    });

    //Below are methods for processing input from clients
    this.clearClicks=function(){
        cManager.clearClicks()
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
    this.registerPlayerClicks=function(pName){
        cManager.registerPlayerClicks(pName,players)
    }

    /**
     * This function sets movement between two regions.
     */
    this.setMovementCommand=function(r1,r2,pName){
        cManager.createMoveCommand(r1,r2,pName,players)
    }

    /**
     * This function processes the research commands
     * @param rName The research name.
     */
    this.researchCommand=function(rName){
        cManager.researchCommand(rName,players);
    }

    this.getRegions=function(){
        return regions;
    }

    this.getPlayers=function(){
        return players;
    }

    /**
     * This method returns information about the map.
     */
    this.exportGameInfo=function(){
        var rData={};
        regions.forEach(function(reg){
            var data={};
            data["x"]=reg.getX();
            data["y"]=reg.getY();
            data["aX"]=reg.getX();
            data["aY"]=reg.getY();
            rData[reg.getName()]=data
        });
        var numPlayers=players.length;

        var upgrades=Array("Movement","Infrastructure","Farming","Defense");
        //TODO:Store this in a config file somewhere else and make sure that the names are not declared in multiple places.

        return {"regionData":rData,"numPlayers":numPlayers,"upgrades":upgrades};
    }

    this.updateState=function(){

        players.forEach(function(player){
            player.update();
        });

        recruitTimer.update();
        aiTimer.update();

        var regionState=regions.map(function(reg){
            reg.update(); //Updates state for each region.
            return reg.exportState();
        });

        var capitals={};
        var moveCommands={};
        var playerData={};
        players.forEach(function(player){
            capitals[player.getAI().username(player)]= player.getCapital().getName();
            moveCommands[player.getAI().username(player)]=player.exportMoveCommands();
            if(player.powerStatus()==true){  //Ignore minor powers.
                playerData[player.getAI().username(player)]= player.exportState();
            }
        });

        var cMessages=cManager.getClickMessages();
        return {"regionStates":regionState,"moveCommands":moveCommands,"capitals":capitals,"clickMessages":cMessages,"playerData":playerData};
    }

    this.getRegionCount=function(){
        return regions.length;
    }

}