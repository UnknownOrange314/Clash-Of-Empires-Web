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
    var lineConfig={};
    var symbols={};
    var battleMark=null
    var clickReg=null
    var maxTime=30
    var displayCache=new DisplayCache("stuff")
    var flags={}

    var symbolView=new symbolCanvas()
    var dataView=new DataCanvas()

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
            flags=loadFlags(data["FlagData"])
            symbolView=new symbolCanvas()
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
                symbolView.drawSymbols(data,flags,symbols)
            }
        })
    }

    //Load data and draw regions
    var rData=dataCon.getMapInfo();
    this.drawShapes(rData)

    var showOwners=function(gameState,svg){
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
        var gameState=dataCon.getRegionStates();



        var svg=d3.select("svg")
        showOwners(gameState,svg)

        processClick(gameState)
        var pData=dataCon.getPlayerState()
        Object.keys(pData).forEach(function(name){
            svg.selectAll("text#Score_"+pData[name]["num"])
                .text(name+" Empire:"+pData[name]["score"])
        });

        dataView.update(gameState,hpLocs,battleMark,lineConfig)


        if(timer.getTime()>maxTime){
            console.log("Too slow, game update time:"+timer.getTime()+"ms")
        }
    }
}
