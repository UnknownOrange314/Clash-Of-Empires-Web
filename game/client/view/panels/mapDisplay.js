/**
 * @param dataCon The object used to get rendering data.
 * @param pName The name of the player
 * @param rCont The place where the game is going to be rendered.
 * @constructor
 */
function MapDisplay(dataCon,pName,rCont){

    var maxTime=30;
    var symbolView=null;
    var dataView=null;
    var svgView=null;
    var scoreView=null;
    var alertView=new AlertView();
    var cycleNum=0;

    $.ajax({
        url:"game/server/game/renderConfig.json",
        dataType:"json",
        async:"false",
        success:function(data){
            var colorData=data["PlayerColors"][0];
            var labelConfig=data["ArmyLabels"][0];
            dataView=new DataCanvas(data);
            symbolView=new SymbolCanvas(data);
            svgView=new SvgView(pName,colorData,labelConfig);
            scoreView=new ScoreView(data);
            console.log("Symbol View:"+symbolView);
        },
        error:function(xhr,ajaxOptions,thrownError){
            console.log("Error loading config file")
        }
    });
    console.log("Done loading");

    this.drawShapes=function(data){
        $.ajax({
            url:"game/server/maps/europe/map.svg",
            dataType:"text",
            success: function(imgData){
                console.log("SVGView:"+svgView);
                svgView.setupRegionView(imgData,data,rCont,dataCon);
                symbolView.update(data);
            }
        })
    }

    //Load data and draw regions
    this.drawShapes(dataCon.getMapInfo());
    var keyList=new KeyListener(dataCon,svgView,symbolView,dataView);


    this.gameLoop=function(){
        var timer=new Timer();
        cycleNum++;
        var gameState=dataCon.getRegionStates();
        svgView.showClick(gameState,dataCon);
        //Rendering things too fast will make things confusing.
        if(cycleNum%MapDisplay.updateSpeed==2){ //TODO:Make sure that the "60" is not hardcoded.
            svgView.updateData(gameState);
            scoreView.update(dataCon);
        }
        dataView.update(gameState);
        alertView.update(gameState["clickMessages"]);
        var cText=gameState["clickMessages"];
        if(timer.getTime()>maxTime){
            console.log("Too slow, game update time:"+timer.getTime()+"ms")
        }
    }
}
MapDisplay.updateSpeed=30; //Number of cycles between updating the view.
