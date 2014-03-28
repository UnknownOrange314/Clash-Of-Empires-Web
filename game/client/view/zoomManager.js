/**
 * This function handles zooming in and out.
 * @param xS The xScale.
 * @param yS The yScale.
 * @param ct The canvas object.
 * @constructor
 */
function ZoomManager(xS,yS,ct){
    var xScale=xS;
    var yScale=yS;
    var ctx=ct;

    ctx.scale(xScale,yScale);
    var zoom=1.0;

    this.zoomIn=function(){
        zoom+=0.04;
        ctx.setTransform(1,0,0,1,0,0);
        ctx.scale(xScale*zoom,yScale*zoom);
        ctx.clearRect(0,0,1000,1000);
    }

    this.zoomOut=function(){
        zoom-=0.04;
        ctx.setTransform(1,0,0,1,0,0);
        console.log(xScale*zoom+":"+yScale*zoom)
        ctx.scale(xScale*zoom,yScale*zoom);
        ctx.clearRect(0,0,1000,1000);
    }

    this.getZoom=function(){
        return zoom;
    }


}