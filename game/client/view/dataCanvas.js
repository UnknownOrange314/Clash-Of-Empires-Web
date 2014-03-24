function DataCanvas(config){

    var cName='animation'
    var ctx=getCanvas(cName)
    ctx.scale(1.335,1.345)//For some unknown reason, the canvas coordinates need to be scaled.

    //Load explosion image.
    var battleMark=new Image();
    battleMark.src=config["ImageLocs"]["combat"]

    var hpLocs=config["BarLocs"]
    var lineConfig=config["moveLocs"]

    var showRegDamage=function(gameState){
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
    }

    var showMoveCommands=function(gameState){
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
    }
    this.update=function(gameState){
        clearCanvas(cName)
        showRegDamage(gameState)
        showMoveCommands(gameState)

    }
}