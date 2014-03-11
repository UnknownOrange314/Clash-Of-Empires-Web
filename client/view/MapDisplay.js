
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

    var colorData={};
    var labelConfig={};
    var tShapeConfig={};

    var maxTime=30
    var displayCache=new DisplayCache("stuff")

    $.getJSON("server/game/config.json",function(data){
        colorData=data["PlayerColors"][0]
        labelConfig=data["ArmyLabels"][0]
    });

    this.drawShapes=function(data){

        $.ajax({
            url:"images/map.svg",
            dataType:"text",
            success: function(imgData){
                $("body").prepend(imgData)
                Object.keys(data).forEach(function(reg){
                    var rData=data[reg]
                    var svg=d3.select("svg")
                    svg.selectAll("text#"+reg)
                        .attr("x",rData["x"])
                        .attr("y",rData["y"])
                        .attr("fill",labelConfig["fill"])
                        .attr("transform","translate(10,20)")
                        .attr("font-size",labelConfig["font-size"])
                        .attr("font-weight",labelConfig["font-weight"])

                    svg.selectAll("path#"+reg)
                        .attr("stroke-width",tShapeConfig["strokeWidth"])
                        .attr("transform","scale(0.25)")
                        .on("click",function(d,i){console.log(d+":"+i+"  "+reg); dataCon.sendClick(reg,pName)      })
                });
                var rifle=new Image();
                rifle.onload=function(){
                    var canvas=document.getElementById('myCanvas');
                    var ctx=canvas.getContext('2d');
                    ctx.fillStyle = 'yellow';

                    ctx.rect(0,0,100,100)
                    Object.keys(data).forEach(function(reg){
                        var d=data[reg];
                        console.log("Region name:"+reg)
                        console.log(d["aX"]+":"+d["aY"])
                        var x=data[reg]["x"]*1.34
                        var y=data[reg]["y"]*1.34
                        ctx.drawImage(rifle,x,y,15,15*rifle.height/rifle.width)
                    });

                }
                rifle.src='images/soldier.png'

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

        var timer=new Timer()

        var gameState=dataCon.getRegionStates(); //Ask for the game state
        if(gameState==undefined){
            return;
        }

        var svg=d3.select("svg")
        gameState["regionStates"].map(function(state){
            displayCache.updateReg(state["name"],state["owner"])
            svg.selectAll("text#"+state["name"])
                .text(state["army"])
        });


        while(displayCache.hasUpdates()){
            var update=displayCache.getUpdate()
            svg.selectAll("path#"+update["name"])
                .attr("fill",colorData[update["owner"]])
        }

        var pData=dataCon.getPlayerState()

        Object.keys(pData).forEach(function(name){
            svg.selectAll("text#Score_"+pData[name]["num"])
                .text(name+":"+pData[name]["score"])
        });




        //Indicate that an area has been clicked.
        var clickData=dataCon.getSavedClick();

        svg.selectAll("path#"+clickData)
            .attr("fill","white")

        if(timer.getTime()>maxTime){
            console.log("Too slow, game update time:"+timer.getTime()+"ms")
        }
    }
}
