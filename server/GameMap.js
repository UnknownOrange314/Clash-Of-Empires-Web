function GameMap(){


    var socket = io.connect('http://192.17.224.200:880');//Connect to server.

    var mapGen=new Europe();
    var data=mapGen.generateMap();
    var regions=data["regions"];
    var players=data["players"];





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
    this.processClick=function(pt){
        if(clickA==null){
            clickA=pt;
        }
        else{
            clickB=pt;
            this.processTwoClicks();
            this.clearClicks();
        }
    }

    /**
     * This function is called when two clicks are made.
     */
    this.processTwoClicks=function(){
        var r1=null;
        var r2=null;
        regions.forEach(function(region){
            if(region.getLocation().getDistance(clickA)<40){
                r1=region;
            }
            if(region.getLocation().getDistance(clickA)<40){
                r2=region;
            }
        });
        this.setMovementCommand(r1,r2);
    }

    /**
     * This function sets movement between two regions.
     */
    this.setMovementCommand=function(r1,r2){
        //If r1 and r2 are owned by the same player, troops will move.
        //if r1 and r2 are owned by different players, the troops will attack.
    }



    this.updateState=function(){


        //Perform updateState actions.
        players.forEach(function(player){
            player.updateState();
        });


        //Build troops for each region
        regions.forEach(function(region){
            region.buildTroop();
        });


        var renderState=regions.map(function(region){
            return region.getRenderState();
        });

        var JSONState=renderState.map(function(state){
            var arr={};
            arr["owner"]=state.getOwner();
            arr["xPos"]=state.getX();
            arr["yPos"]=state.getY();
            arr["size"]=state.getSize();
            arr["army"]=state.getArmy();
            return arr;
        });
        socket.emit('hostRegionState', { data: JSONState});
        return JSONState;
    }

    this.getRegionCount=function(){
        return regions.length;
    }

    this.getPlayerStates=function(){
        return players.map(function(p){
            return p.getScore();
        });
    }
}
