function RegionInfo(){

    var ctx=getCanvas(RegionInfo.canvasName);
    var w=getWidth(RegionInfo.canvasName);
    var h=getHeight(RegionInfo.canvasName);

    /**
     * Updates the region view
     * @param gameState The data representing the current game state.
     * @param dataCon An object representing a connection with the server.
     */
    this.update=function(gameState,dataCon){
        ctx.clearRect(0,0,w,h);
        //Get the click data.
        var clickData=dataCon.getSavedClick();
        gameState["regionStates"].map(function(state){ //Restore old color.
            if(state["name"]==clickData){
                ctx.fillStyle="#000000"
                ctx.fillRect(0,0,w,h);
                ctx.fillStyle="#FFFFFF";
                ctx.font='26pt Calibri';
                ctx.fillText("Region:"+state["name"],10,40);
                ctx.font='16pt Calibri';
                ctx.fillText("Hit points: "+state["hitPoints"],10,80);
                ctx.fillText("Number of troops: "+state["army"],10,120);
                ctx.fillText("Population: "+state["population"]+" million",10,160);
                ctx.fillText("Tax income: $"+state["tax"],10,200);
                ctx.fillText("Tax:"+state["economy"],10,240);
                ctx.fillText("Research:"+state["research"],10,260);
                ctx.fillText("Barracks:"+state["barracks"],10,280);
            }
        });
    }
}
RegionInfo.canvasName="regInfo"