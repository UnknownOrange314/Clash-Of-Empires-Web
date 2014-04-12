/**
 * This class is responsible for rendering SVG data.
 * @param pN The player that is associated with the display.
 * @param cData Configuration data for the color.
 * @param lConf Configuration data for labels.
 * @constructor
 */
function SvgView(pN,cData,lConf){

    var zoom=0.25;
    var pName=pN; //Name of player.
    var colorData=cData; //Data about the color.
    var labelConfig=lConf; //Location of labels.
    var displayCache=new DisplayCache();//This is for improving rendering speed.
    var clickReg=null; //The region that has been clicked on.
    var svg=null; //The SVG graphics object.

    /**
     * Draws the region.
     * @param shapeData The region shapes.
     * @param regionData Data about the region.
     * @param renderCont The location where the image will go.
     * @param dataCon The connection to the server to get the data.
     */
    this.setupRegionView=function(shapeData,regionData,renderCont,dataCon){
        renderCont.find("#game").prepend(shapeData);
        svg=d3.select("svg");
        Object.keys(regionData).forEach(function(reg){
            var rData=regionData[reg];
            svg.selectAll("text#"+reg)
                .attr("x",rData["x"])
                .attr("y",rData["y"])
                .attr("fill",labelConfig["fill"])
                .attr("transform","translate(10,20)")
                .attr("font-size",labelConfig["font-size"])
                .attr("font-weight",labelConfig["font-weight"]);
            svg.selectAll("path#"+reg)
                .attr("stroke-width",2)
                .attr("transform","scale("+zoom+")")
                .on("click",function(d,i){console.log(d+":"+i+"  "+reg); dataCon.sendClick(reg,pName)      })
        });

    }

    /**
     * Changes the color of the region to indicate the owner.
     * @param gameState
     */
    this.updateData=function(gameState){
        gameState["regionStates"].map(function(state){
            svg.selectAll("path#"+state["name"])
                .attr("fill",colorData[state["owner"]]);
            displayCache.updateReg(state["name"],state["owner"]);
            svg.selectAll("text#"+state["name"])
                .text(state["army"])
        });
        while(displayCache.hasUpdates()){
            var update=displayCache.getUpdate();
            svg.selectAll("path#"+update["name"])
                .attr("fill",colorData[update["owner"]])
        }

    }

    /**
     * Shows the region that the player clicked on.
     * @param gameState The game state.
     * @param dataCon The connection with the server.
     */
    this.showClick=function(gameState,dataCon){
        //Indicate that an area has been clicked.
        var clickData=dataCon.getSavedClick();
        gameState["regionStates"].map(function(state){ //Restore old color.
            if(state["name"]==clickReg){
                svg.selectAll("path#"+state["name"])
                    .attr("fill",colorData[state["owner"]])
            }
        })
        clickReg=clickData;
        svg.selectAll("path#"+clickData)//Color other region.
            .attr("fill","white");
    }


    /**
     * Updates the view.
     * @param data The data that is used for rendering.
     */
    this.processZoom=function(data){
        Object.keys(data).forEach(function(reg){
            var rData=data[reg];
            svg.selectAll("path#"+reg)
                .attr("stroke-width",2)
                .attr("transform","scale("+zoom+")");
            svg.selectAll("text#"+reg)
                .attr("transform","translate(10,20)scale("+4*zoom+")");
        });
        var z=zoom*4;
        svg.selectAll("image")
            .attr("transform","scale("+z+")");

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