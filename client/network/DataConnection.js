function LocalConnection(){

    console.log("Starting")
    var myMap=null
    $.ajaxSetup({"async":false});

    $.getJSON("server/maps/Europe.json",function(json){
        myMap=new GameMap(new Europe(json));
    });

    console.log("Done");



    this.getPlayerInfo=function(){
        return myMap.getPlayerInfo();
    }

    this.getRegionStates=function(){
        return myMap.updateState();
    }

    /**
     * Return the clicks that a player made.
     */
    this.getSavedClick=function(){
        return myMap.getFirstClick();
    }

    this.sendClick=function(data,pName){
        myMap.processClick(data,pName);
    }

    /**
     * Adds information about a client player to the server.
     */
    this.registerPlayer=function(pName){
        myMap.registerPlayer(pName);
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

    this.getPlayerInfo=function(){
        return [];
    }

}




