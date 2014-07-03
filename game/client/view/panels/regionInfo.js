function RegionInfo(){

    var panel=new Panel(0,0,1000,1000,RegionInfo.canvasName);

    /**
     * Updates the region view
     * @param gameState The data representing the current game state.
     * @param dataCon An object representing a connection with the server.
     */
    this.update=function(gameState,dataCon){
        panel.clearCanvas();
        //Get the click data.
        var clickData=dataCon.getSavedClick();
        gameState["regionStates"].map(function(state){ //Restore old color.
            if(state["name"]==clickData){
                panel.setColor("#000000");
                var ctx=panel.getCanvas;
                ctx.fillRect(0,0,w,h);
                panel.setFont('26pt Calibri');
                panel.fillText("Region:"+state["name"],10,40);
                panel.setFont('16pt Calibri');
                panel.fillText("Hit points: "+state["hitPoints"],10,80);
                panel.fillText("Number of troops: "+state["army"],10,120);
                panel.fillText("Population: "+state["population"]+" million",10,160);
                panel.fillText("Tax income: $"+state["tax"],10,200);
                panel.fillText("Tax:"+state["economy"],10,240);
                panel.fillText("Research:"+state["research"],10,260);
                panel.fillText("Barracks:"+state["barracks"],10,280);
            }
        });
    }
}
RegionInfo.canvasName="regInfo"