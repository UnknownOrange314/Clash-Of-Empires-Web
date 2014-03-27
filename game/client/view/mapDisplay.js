/**
 * @param dataCon The object used to get rendering data.
 * @param pName The name of the player
 * @param rCont The place where the game is going to be rendered.
 * @constructor
 */
function MapDisplay(dataCon,pName,rCont){

    var maxTime=30
    var symbolView=null
    var dataView=null
    var svgView=null
    var scoreView=null
    var alertView=new AlertView()

    $.ajax({
        url:"game/server/game/renderConfig.json",
        dataType:"json",
        async:"false",
        success:function(data){
            var colorData=data["PlayerColors"][0]
            var labelConfig=data["ArmyLabels"][0]
            dataView=new DataCanvas(data)
            symbolView=new SymbolCanvas(data)
            svgView=new SvgView(pName,colorData,labelConfig)
            scoreView=new ScoreView(data)
            console.log("Symbol View:"+symbolView)
        },
        error:function(xhr,ajaxOptions,thrownError){
            console.log("Error loading config file")
        }
    })

    this.drawShapes=function(data){
        $.ajax({
            url:"game/server/maps/europe/map.svg",
            dataType:"text",
            success: function(imgData){
                svgView.drawRegions(imgData,data,rCont,dataCon)
                symbolView.drawSymbols(data)
            }
        })
    }

    //Load data and draw regions
    this.drawShapes(dataCon.getMapInfo())

    this.gameLoop=function(){
        var timer=new Timer()
        var gameState=dataCon.getRegionStates();
        svgView.showOwners(gameState)
        svgView.showClick(gameState,dataCon)
       // svgView.showScore(dataCon)
        scoreView.updateScore(dataCon)
        dataView.update(gameState)
        alertView.update(gameState["clickMessages"])
        var cText=gameState["clickMessages"]




        if(timer.getTime()>maxTime){
            console.log("Too slow, game update time:"+timer.getTime()+"ms")
        }
    }

}
