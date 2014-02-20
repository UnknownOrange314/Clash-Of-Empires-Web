function GameMap(mapGen){

    var time=0;

    var socket = io.connect('http://192.17.205.104:880');//Connect to server.

    var data=mapGen.generateMap();
    var regions=data["regions"];
    var players=data["players"];
    //var humanPlayers=[];
    //humanPlayers[0]=players[0];

    //Below are methods for processing input from clients
    var clickA=null;
    var clickB=null;

    this.clearClicks=function(){
        clickA=null;
        clickB=null;
    }

    /**
     * @param pt
     */
    this.processClick=function(pt,pName){
        if(clickA==null){
            clickA=pt;
        }
        else{
            clickB=pt;
            this.processTwoClicks(pName);
            this.clearClicks();
        }
    }

    this.getRegions=function(){
        return regions;
    }

    this.getPlayers=function(){
        return players;
    }

    /**
     * This method registers a player so that input associated
     * with a player can be processed.
     */
    this.registerPlayer=function(pName){
        var reg=false;
        players.forEach(function(p){
            if(p.getAI() instanceof Computer){
                if(reg===false){
                    p.setAI(new NoAI(pName));
                    console.log("Registering player");
                    reg=true;
                }
            }
        });
    }

    /**
     * This function is called when two clicks are made.
     */
    this.processTwoClicks=function(pName){
        var r1=null;
        var min1=99999;
        var r2=null;
        var min2=99999;
        regions.forEach(function(region){
            var rLoc=region.getLocation();
            if(rLoc.getDistance(clickA)<min1){
                r1=region;
                min1=rLoc.getDistance(clickA);
            }
            if(rLoc.getDistance(clickB)<min2){
                r2=region;
                min2=rLoc.getDistance(clickB);
            }
        });
        var a=r1.getLocation();
        var b=r2.getLocation();
        this.setMovementCommand(r1,r2,pName);
    }

    this.getFirstClick=function(){
        var arr={};
        if(clickA===null){
            arr["x"]=-1;
            arr["y"]=-1;
        }else{
            arr["x"]=clickA.getX();
            arr["y"]=clickA.getY();
        }
        return arr;
    }

    /**
     * This function sets movement between two regions.
     */
    this.setMovementCommand=function(r1,r2,pName){
        console.log("Checking commands");
        players.forEach(function(p){ //Search for the player with the name.
            console.log(pName+":"+ p.getAI().username(p));
            if(p.getAI().username(p)===pName){
                if(r1.hasBorder(r2)){
                    p.addMoveCommand(r1,r2);
                }
            }
        });
    }

    /**
     * This method returns information about a region.
     */
    this.getRegionInfo=function(){
        var rData={};
        regions.forEach(function(reg){
            var data={}
            data["x"]=reg.getX()
            data["y"]=reg.getY()
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
        if(time%30==0){
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


        socket.emit('hostRegionState', { data: regionState});
        return {"regionStates":regionState,"moveCommands":moveCommands,"capitals":capitals};
    }

    this.getRegionCount=function(){
        return regions.length;
    }

    this.getPlayerState=function(){

        var data={};
        players.forEach(function(p){
            var pData={};
            pData["score"]=p.getScore();
            pData["money"]=0.0;
            pData["num"]= p.getNum();
            data[p.getAI().username(p)]=pData;
        });
        return data;
    }
}
