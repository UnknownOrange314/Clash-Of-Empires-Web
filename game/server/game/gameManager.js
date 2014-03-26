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
     * @param pt
     */
    this.processClick=function(pt,pName){
        cManager.processClick(pt,pName,regions,players)
    }

    this.getFirstClick=function(){
        return cManager.getFirstClick()
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
            var data={}
            data["x"]=reg.getX()
            data["y"]=reg.getY()
            data["aX"]=reg.getAx()
            data["aY"]=reg.getAy()
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
        var renderState=regions.map(function(region){
            return region.getRenderState();
        });

        var regionState=renderState.map(function(state){
            var arr={};
            arr["owner"]=state.getOwner();
            arr["xPos"]=state.getX();
            arr["yPos"]=state.getY();
            arr["army"]=state.getArmy();
            arr["hitPoints"]=state.getHP();
            arr["name"]=state.getName();
            return arr;
        });


        var capitals={};
        var moveCommands={};
        players.forEach(function(player){
            capitals[player.getAI().username(player)]= player.getCapital().getName();
            moveCommands[player.getAI().username(player)]=player.exportMoveCommands();
        });

        var cMessages=cManager.getClickMessages()
        console.log("Click Messages:"+cMessages)
        return {"regionStates":regionState,"moveCommands":moveCommands,"capitals":capitals,"clickMessages":cMessages};
    }

    this.getRegionCount=function(){
        return regions.length;
    }



    this.getPlayerState=function(){
        var data={};
        players.forEach(function(p){
            if(p.powerStatus()==true){
                var pData={};
                pData["score"]=p.getScore();
                pData["money"]=0.0;
                pData["num"]= p.getNum();
                data[p.getAI().username(p)]=pData;
            }
        });
        return data;
    }
}
