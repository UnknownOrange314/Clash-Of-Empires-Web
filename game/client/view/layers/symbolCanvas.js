


/**
 * This file contains methods for drawing symbols to the game area.
 */
function SymbolCanvas(config){

    var ctx=getCanvas('symbols');
    var xScale=1.338;
    var yScale=1.348;
    var symbols=config["ImageLocs"];
    var zMan=new ZoomManager(xScale,yScale,ctx);

    var minSoldierZ=1.2; //The minimum zoom level at which the solider images will be shown.


    this.zoomIn=function(rData){
        zMan.zoomIn();
        this.update(rData);
    }

    this.zoomOut=function(rData){
        zMan.zoomOut();
        this.update(rData);
    }

    /**
     * TODO:Make sure that rile image does not have to be reloaded every time we zoom.
     * Draws the canvas
     * @param rData 
     * @param flags
     * @param symbols
     */
    this.update=function(rData){
        var rifle=new Image();
        rifle.onload=function(){
            if(zMan.getZoom()>=minSoldierZ){
                Object.keys(rData).forEach(function(reg){
                    var d=rData[reg];
                    var x=rData[reg]["x"]
                    var y=rData[reg]["y"]
                    ctx.drawImage(rifle,x,y,15/zMan.getZoom(),15*rifle.height/(rifle.width*zMan.getZoom()))
                });
            }
        }
        console.log(symbols["army"])
        rifle.src=symbols["army"]
    }
}


