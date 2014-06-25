/**
 * This class is responsible for rendering SVG data.
 * @param pN The player that is associated with the display.
 * @param cData Configuration data for the color.
 * @param lConf Configuration data for labels.
 * @constructor
 */
function MapLayer(pN,cData,lConf,dataCon){

    var regionData=null
    var cName='gameMap'
    var ctx=getCanvas(cName)

    $("gameMap").click(function(e){
        var cData=transformClick(e,ctx)
        dataCon.sendClick(new Point(cData[0],cData[1]))


    })



    /**
     * Changes the color of the region to indicate the owner.
     * @param gameState
     */
    this.updateData=function(gameState,dataCon){


        var clickData=dataCon.getSavedClick()
        gameState["regionStates"].map(function(state){



            var x=state["xPos"]
            var y=state["yPos"]
            var angles=[120.0,180.0,240.0,300.0,360.0]
            var size=100
            var color=colorData[state["owner"]]
            ctx.fillStyle=color

            ctx.beginPath()
            var rad=60.0*Math.PI/180
            ctx.moveTo(x+size*Math.cos(rad),y+size*Math.sin(rad))
            angles.forEach(function(angle){
                rad=angle*Math.PI/180
                var dx=Math.cos(rad)
                var dy=Math.sin(rad)
                ctx.lineTo(x+dx,y+dy)

            })
            ctx.closePath()

            if(state["name"]==clickData){
                ctx.fillStyle="#FFFFFF"
            }
            ctx.fill()
        })
    }

    this.showClick=function(gameState,dataCon){

    }




    /**
     * //TODO
     * -Make sure that the zooming is working and scaling by the proper amount.
     * -Make sure that clicks are handled properly when zooming. Accomplish this
     *   by transforming the click coordinates if necessary before sending to the server.
     * Updates the view.
     * @param data The data that is used for rendering.
     */
    this.processZoom=function(data){
        ctx.scale(zoom,zoom)
    }

    this.zoomIn=function(data){
        zoom+=0.01;
        this.processZoom(data);
    }

    this.zoomOut=function(data){
        zoom-=0.01;
        this.processZoom(data);
    }

}