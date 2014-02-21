
function getColor(pNum){
    if(pNum==1){
        return 'Red';
    }
    if(pNum==2){
        return 'Yellow';
    }
    if(pNum==3){
        return 'Cyan';
    }
    if(pNum==4){
        return 'Purple';
    }
    if(pNum==5){
        return 'DarkOrange';
    }
    return 'Green';
}


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
function MapDisplay(topX,topY,mapImg,dataCon,titleView,scoreView,background,pName){


    var base=Display();
    var g=base.getGraphics();
    var inputListeners=new Inputs(base.getCanvas(),topX,topY,dataCon,pName);


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
                        .attr("fill","black")
                        .attr("transform","translate(10,20)")
                        .attr("font-size","12px")

                    svg.selectAll("path#"+reg)
                        .attr("transform","scale(0.25)")
                        .attr("stroke-width",5)
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

        titleView.drawSelf();
        scoreView.drawSelf();


        gameState["regionStates"].map(function(state){


            d3.select("svg")
                .selectAll("path#"+state["name"])
                .attr("fill",getColor(state["owner"]))


            d3.select("svg")
                .selectAll("text#"+state["name"])
                .text(state["army"])



        });

        gameState["moveCommands"][pName].forEach(function(state){
            g.beginPath();
            g.moveTo(transX(state["x1"]+10),transY(state["y1"])+10);
            g.lineTo(transX(state["x2"]+10),transY(state["y2"])+10);
            g.stroke();

        });
        //Indicate that an area has been clicked.
        var clickData=dataCon.getSavedClick();
        var x=clickData["x"];
        var y=clickData["y"];

        g.fillStyle='Black';
        g.rect(x,y,40,40);
        g.fillText("Click",transX(x),transY(y));

        var end=new Date().getTime();
      //  console.log("Time "+(end-start));

    }
}
