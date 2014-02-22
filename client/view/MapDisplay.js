/**
 *
 * @param topX The top x coordinate.
 * @param topY The top y coordinate.
 * @param mapImg The map image.
 * @param dataCon The object used to get rendering data.
 * @param titleView The panel that has the title.
 * @param scoreView The panel that has player score information.
 * @param background The background image for the game.
 * @param pName The name of the player
 * @constructor
 */
function MapDisplay(topX,topY,mapImg,dataCon,background,pName){

    var base=Display();
    var g=base.getGraphics();
    var inputListeners=new Inputs(base.getCanvas(),topX,topY,dataCon,pName);

    var colorData={}
    var labelConfig={}
    var tShapeConfig={}

    $.getJSON("server/game/config.json",function(data){
        colorData=data["PlayerColors"][0]
        labelConfig=data["ArmyLabels"][0]
    });

    this.drawShapes=function(data){

        $.ajax({
            url:"images/map.svg",
            dataType:"text",
            success: function(imgData){
                $("body").append(imgData)
                Object.keys(data).forEach(function(reg){
                    var rData=data[reg]
                    var svg=d3.select("svg")
                    svg.selectAll("text#"+reg)
                        .attr("x",rData["x"])
                        .attr("y",rData["y"])
                        .attr("fill",labelConfig["fill"])
                        .attr("transform","translate(10,20)")
                        .attr("font-size",labelConfig["font-size"])

                    svg.selectAll("path#"+reg)
                        .attr("transform","scale(0.25)")
                        .attr("stroke-width",tShapeConfig["strokeWidth"])
                        .on("click",function(d,i){console.log(d+":"+i+"  "+reg); dataCon.sendClick(reg,pName)      })
                });
            }
        })
    }

    //Load data and draw regions
    var rData=dataCon.getRegionInfo();
    this.drawShapes(rData)

    function transX(x){
        return x+topX;
    }

    function transY(y){
        return y+topY;
    }

    this.gameLoop=function(){

        var start=new Date().getTime();
        var gameState=dataCon.getRegionStates(); //Ask for the game state
        if(gameState==undefined){
            return;
        }
        var svg=d3.select("svg")

        gameState["regionStates"].map(function(state){

            svg.selectAll("path#"+state["name"])
                .attr("fill",colorData[state["owner"]])

            svg.selectAll("text#"+state["name"])
                .text(state["army"])

        });

        var pData=dataCon.getPlayerState()
        Object.keys(pData).forEach(function(name){
            svg.selectAll("text#Score_"+pData[name]["num"])
                .text(name+":"+pData[name]["score"])
        });



        gameState["moveCommands"][pName].forEach(function(state){
            g.beginPath();
            g.moveTo(transX(state["x1"]+10),transY(state["y1"])+10);
            g.lineTo(transX(state["x2"]+10),transY(state["y2"])+10);
            g.stroke();

        });
        //Indicate that an area has been clicked.
        var clickData=dataCon.getSavedClick();

        svg.selectAll("path#"+clickData)
            .attr("fill","white")
          



        var end=new Date().getTime();
        //console.log("Time "+(end-start));

    }
}
