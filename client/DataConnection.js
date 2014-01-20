function LocalConnection(){

    this.myMap=new GameMap();

    this.getPlayerStates=function(){
        return this.myMap.getPlayerStates();
    }

    this.getRegionStates=function(){
        return this.myMap.updateState();

    }
}

/**
 * This object is for the client to get data from the server.
 * @constructor
 */
function ClientConnection(){

    var regionState=[];
    this.saveRegionStates=function(rState){
        regionState=rState;
    }
    this.getRegionStates=function(){
        return regionState;
    }

    this.getPlayerStates=function(){
        return [];
    }

}




