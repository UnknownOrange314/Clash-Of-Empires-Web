/**
 * @param dataCon The object used to get rendering data.
 * @param pName The name of the player
 * @param rCont The place where the game is going to be rendered.
 * @constructor
 */
function MapDisplay(dataCon,pName,rCont){

    var maxTime=30;
    var inList=new InputListener(dataCon,this);
    var dataView=null;
    var svgView=null;
    var scoreView=null;
    var alertView=new AlertView();
    var regionInfo=new RegionInfo(); //This is the view responsible for showing region information.

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
            svgView=new SvgView(pName,colorData,labelConfig);
            scoreView=new ScoreView(data,inList);
        },
        error:function(xhr,ajaxOptions,thrownError){
            console.log("Error loading config file")
        }
    });

    this.drawShapes=function(data){
        $.ajax({
            url:"game/server/maps/europe/map.svg",
            dataType:"text",
            success: function(imgData){
                svgView.setupRegionView(imgData,data,rCont,dataCon);
            }
        })
    }

    //Load data and draw regions
    this.drawShapes(dataCon.getMapInfo());
    inList.addLayer(svgView);
    inList.addLayer(dataView);
    var interfaceCont=new InterfaceView(this,inList);

    var obj=this;
    this.gameLoop=function(){
        var timer=new Timer();
        cycleNum++;
        var gameState=dataCon.getRegionStates();
        svgView.showClick(gameState,dataCon);
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
        regionInfo.update(gameState,dataCon);
    }
}


MapDisplay.updateSpeed=30; //Number of cycles between updating the view.

MapDisplay.prototype.speedRender=function(){
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
