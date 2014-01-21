function LocalConnection(){

    myMap=new GameMap();

    this.getPlayerStates=function(){
        return myMap.getPlayerStates();
    }

    this.getRegionStates=function(){
        return myMap.updateState();
    }

    this.sendClick=function(data){
        myMap.processClick(data);
    }
}

/**
 * This object is for the client to get data from the server and send data.
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



