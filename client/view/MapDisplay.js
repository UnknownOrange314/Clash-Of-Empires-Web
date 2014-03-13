/**
 * @param dataCon The object used to get rendering data.
 * @param pName The name of the player
 * @constructor
 */
function MapDisplay(dataCon,pName){

    var hpLocs={};
    var colorData={};
    var labelConfig={};
    var tShapeConfig={};
    var clickReg=null
    var maxTime=30
    var displayCache=new DisplayCache("stuff")

    //Load explosion image.
    var explosion=new Image();
    explosion.onload=function(){

    }
    explosion.src='images/explosion.png'

    var arrow=new Image();
    arrow.onload=function(){

    }
    arrow.src='images/arrow.png'


    $.getJSON("server/game/renderConfig.json",function(data){
        colorData=data["PlayerColors"][0]
        labelConfig=data["ArmyLabels"][0]
        hpLocs=data["BarLocs"]
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
                    var canvas=document.getElementById('symbols');
                    var ctx=canvas.getContext('2d');
                    ctx.fillStyle = 'yellow';
                    ctx.rect(0,0,100,100)
                    Object.keys(data).forEach(function(reg){
                        var d=data[reg];
                        var x=data[reg]["x"]*1.335
                        var y=data[reg]["y"]*1.345
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
                console.log("Restoring old color  of "+clickReg)
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
                .text(name+":"+pData[name]["score"])
        });

        var canvas=document.getElementById('animation');
        var ctx=canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width,canvas.height)

        gameState["regionStates"].forEach(function(reg){

            var xO=0
            var yO=0
            var rName=reg["name"]
            if(rName in hpLocs){
                xO=parseInt(hpLocs[rName]["x"])
                yO=parseInt(hpLocs[rName]["y"])
            }

            var lX=25*reg["hitPoints"]/1000
            var xT=(reg["xPos"]-10)*1.335+xO
            var yT=(reg["yPos"]-10)*1.345+yO
            ctx.fillStyle="#00FF00"
            ctx.fillRect(xT,yT,lX,5)
            ctx.fillStyle="#FF0000"
            ctx.fillRect(xT+lX,yT,25-lX,5)
            ctx.strokeStyle="#000000"
            ctx.strokeRect(xT,yT,25,5)
        })


        Object.keys(gameState["moveCommands"]).forEach(function(name){
            gameState["moveCommands"][name].forEach(function(loc){

                loc["x1"]=loc["x1"]*1.335
                loc["x2"]=loc["x2"]*1.345

                loc["y1"]=loc["y1"]*1.345
                loc["y2"]=loc["y2"]*1.345

                var x=(loc["x1"]+loc["x2"])/2
                var y=(loc["y1"]+loc["y2"])/2

                if(name=="Host"){

                    var x1=loc["x1"]
                    var x2=loc["x2"]
                    var y1=loc["y1"]
                    var y2=loc["y2"]

                    var aX=x2-x1
                    var aY=y2-y1
                    var angle=findAngle(aX,aY)

                    x1+=20*Math.cos(angle)
                    y1+=20*Math.sin(angle)
                    x2-=20*Math.cos(angle)
                    y2-=20*Math.sin(angle)
                    ctx.save()
                    ctx.lineWidth=2
                    ctx.moveTo(x1,y1)
                    ctx.lineTo(x2,y2)
                    ctx.stroke()
                    ctx.restore()

                    ctx.save()
                    ctx.translate(x2,y2)
                    ctx.rotate(angle)
                    ctx.translate(-x2,-y2)
                    ctx.fillStyle="#000000"
                    ctx.beginPath();
                    ctx.moveTo(x2,y2-5);
                    ctx.lineTo(x2,y2+5);
                    ctx.lineTo(x2+5,y2);
                    ctx.closePath()
                    ctx.fill()
                    ctx.restore()

                }

                if(loc["conflict"]==true){
                    ctx.drawImage(explosion,loc["x2"]+15,loc["y2"]+10,15,15)
                }
            })
        })

        //console.log("Time:"+timer.getTime())
        if(timer.getTime()>maxTime){
            console.log("Too slow, game update time:"+timer.getTime()+"ms")
        }
    }
}
