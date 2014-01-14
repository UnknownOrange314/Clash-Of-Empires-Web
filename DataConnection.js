function DataConnection(){

    this.myMap=new GameMap();

    this.getGameState=function(){
        var curState=this.myMap.updateState();
        return curState;

    }

}


