/**
 * @param dataCon The object used to get rendering data.
 * @param pName The name of the player
 * @constructor
 */
function MapDisplay(dataCon,pName){

    console.log("Running game")
    var hpLocs={};
    var colorData={};
    var labelConfig={};
    var tShapeConfig={};
    var lineConfig={};

    var symbols={};
    var battleMark=null
    var clickReg=null
    var maxTime=30
    var displayCache=new DisplayCache("stuff")

    var move=getCanvas('animation')
    move.scale(1.335,1.345)

    var russia=new Image();
    russia.onload=function(){
    }
    russia.src='game/server/maps/europe/flags/Russia.png'

    var ottoman=new Image();
    ottoman.onload=function(){

    }
    ottoman.src='game/server/maps/europe/flags/Ottoman.png'

    var france=new Image();
    france.onload=function(){

    }
    france.src='game/server/maps/europe/flags/France.png'

    var britain=new Image();
    britain.onload=function(){

    }
    britain.src='game/server/maps/europe/flags/Britain.png'

    $.ajax({
        url:"game/server/game/renderConfig.json",
        dataType:"json",
        async:"false",
        success:function(data){
            colorData=data["PlayerColors"][0]
            labelConfig=data["ArmyLabels"][0]
            symbols=data["ImageLocs"]
            hpLocs=data["BarLocs"]
            lineConfig=data["moveLocs"]
            //Load explosion image.
            battleMark=new Image();
            battleMark.src=symbols["combat"]
        }
    })




    this.drawShapes=function(data){
        $.ajax({
            url:"game/server/maps/europe/map.svg",
            dataType:"text",
            success: function(imgData){
                $("body").find("#game").prepend(imgData)
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
                    var ctx=getCanvas('symbols')
                    ctx.fillStyle = 'yellow';
                    ctx.rect(0,0,900,900)
                    ctx.scale(1.335,1.345)
                    Object.keys(data).forEach(function(reg){
                        var d=data[reg];
                        var x=data[reg]["x"]
                        var y=data[reg]["y"]
                        ctx.drawImage(rifle,x,y,15,15*rifle.height/rifle.width)
                    });


                    var size=40
                    var h=100
                    var dH=60
                    ctx.drawImage(france,20,h,size,size*france.height/france.width)
                    h+=dH
                    ctx.drawImage(britain,20,h,size,size*britain.height/britain.width)
                    h+=dH
                    ctx.drawImage(ottoman,20,h,size,size*ottoman.height/ottoman.width)
                    h+=dH
                    ctx.drawImage(russia,20,h,size,size*russia.height/russia.width)
                    h+=dH


                }
                console.log(symbols["army"])
                rifle.src=symbols["army"]

                var ctx=getCanvas('symbols')



            }
        })
    }

    //Load data and draw regions
    var rData=dataCon.getMapInfo();
    this.drawShapes(rData)

    var showOwners=function(gameState){
        var svg=d3.select("svg")
        gameState["regionStates"].map(function(state){
            svg.selectAll("path#"+state["name"])
                .attr("fill",colorData[state["owner"]])
            displayCache.updateReg(state["name"],state["owner"])
            svg.selectAll("text#"+state["name"])
                .text(state["army"])
        });
        while(displayCache.hasUpdates()){
            var update=displayCache.getUpdate()
            svg.selectAll("path#"+update["name"])
                .attr("fill",colorData[update["owner"]])
        }
    }

    var processClick=function(gameState){

        var svg=d3.select("svg")

        //Indicate that an area has been clicked.
        var clickData=dataCon.getSavedClick()
        gameState["regionStates"].map(function(state){ //Restore old color.
            if(state["name"]==clickReg){
                svg.selectAll("path#"+state["name"])
                    .attr("fill",colorData[state["owner"]])
            }
        })
        clickReg=clickData
        svg.selectAll("path#"+clickData)//Color other region.
            .attr("fill","white")
    }

    this.gameLoop=function(){
        var timer=new Timer()
        var gameState=dataCon.getRegionStates(); //Ask for the game state
        if(gameState==undefined){
            return;
        }
        showOwners(gameState)
        processClick(gameState)
        var svg=d3.select("svg")
        var pData=dataCon.getPlayerState()
        Object.keys(pData).forEach(function(name){
            svg.selectAll("text#Score_"+pData[name]["num"])
                .text(name+" Empire:"+pData[name]["score"])
        });

        var ctx=getCanvas('animation')
        clearCanvas('animation')

        gameState["regionStates"].forEach(function(reg){

            var xO=0
            var yO=0
            var rName=reg["name"]
            if(rName in hpLocs){
                xO=parseInt(hpLocs[rName]["x"])
                yO=parseInt(hpLocs[rName]["y"])
            }

            var lX=25*reg["hitPoints"]/1000
            var xT=(reg["xPos"]-10)+xO
            var yT=(reg["yPos"]-10)+yO
            ctx.fillStyle="#00FF00"
            ctx.fillRect(xT,yT,lX,5)
            ctx.fillStyle="#FF0000"
            ctx.fillRect(xT+lX,yT,25-lX,5)
            ctx.strokeStyle="#000000"
            ctx.strokeRect(xT,yT,25,5)
        })


        Object.keys(gameState["moveCommands"]).forEach(function(name){
            gameState["moveCommands"][name].forEach(function(loc){


                var x=avg(loc["x1"],loc["x2"])
                var y=avg(loc["y1"],loc["y2"])
                if(name=="Host"){


                    var dX=0
                    var dY=0

                    var n=loc["sCity"]+"_"+loc["eCity"]
                    var nR=loc["eCity"]+"_"+loc["sCity"]
                    if(n in lineConfig){
                        dX=parseInt(lineConfig[n][0])
                        dY=parseInt(lineConfig[n][1])
                        console.log("Moving line")
                    }
                    if(nR in lineConfig){
                        dX=parseInt(lineConfig[nR][0])
                        dY=parseInt(lineConfig[nR][1])
                    }
                    var x1=loc["x1"]+dX
                    var x2=loc["x2"]+dX
                    var y1=loc["y1"]+dY
                    var y2=loc["y2"]+dY

                    drawArrow(x1,y1,x2,y2,ctx)
                }
                if(loc["conflict"]==true){
                    ctx.drawImage(battleMark,loc["x2"]+15,loc["y2"],15,15)
                }
            })
        })

        if(timer.getTime()>maxTime){
            console.log("Too slow, game update time:"+timer.getTime()+"ms")
        }
    }
}
