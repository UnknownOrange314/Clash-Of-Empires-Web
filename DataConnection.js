function DataConnection(){

    this.myMap=new GameMap();

    this.getGameState=function(){
        var curState=this.myMap.updateState();
        return curState;

    }

    this.getPlayerStates=function(){
        return this.myMap.getPlayerStates();
    }

    this.getRegionStates=function(){
        return this.myMap.updateState();
    }

}


