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
    this._upSpeed=MapDisplay.updateSpeed;

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
                svgView.setupRegionView(imgData,data,rCont,dataCon);
                symbolView.update(data);
            }
        })
    }

    //Load data and draw regions
    this.drawShapes(dataCon.getMapInfo());
    var inList=new InputListener(dataCon,svgView,symbolView,dataView,this);
    var interfaceCont=new InterfaceView(this,inList);

    var obj=this;
    this.gameLoop=function(){
        var timer=new Timer();
        cycleNum++;
        var gameState=dataCon.getRegionStates();
        svgView.showClick(gameState,dataCon);

        console.log(obj._upSpeed)
        //Rendering things too fast will make things confusing.
        if(cycleNum%obj._upSpeed==0){ //TODO:Make sure that the "60" is not hardcoded.
            svgView.updateData(gameState);
            scoreView.update(dataCon);
        }
        dataView.update(gameState);
        alertView.update(gameState["clickMessages"]);
        interfaceCont.update();
        var cText=gameState["clickMessages"];
        if(timer.getTime()>maxTime){
            console.log("Too slow, game update time:"+timer.getTime()+"ms")
        }
    }
}


MapDisplay.updateSpeed=30; //Number of cycles between updating the view.

MapDisplay.prototype.speedRender=function(){
    console.log("Speed render")
    console.log("Item:"+this);
    console.log("Update speed:"+this._upSpeed)
    this._upSpeed--;
}

MapDisplay.prototype.slowRender=function(){
    console.log("Slow render")
    console.log(this._upSpeed)
    this._upSpeed++;
}

MapDisplay.prototype.getUpdateSpeed=function(){
    return this._upSpeed;
}