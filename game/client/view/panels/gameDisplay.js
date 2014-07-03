/**
 * @param dataCon The object used to get rendering data.
 * @param pName The name of the player
 * @param rCont The place where the game is going to be rendered.
 * @constructor
 */
function GameDisplay(dataCon){

    var inList=new InputListener(dataCon,this);
    var dataView=null;
    var mapView=null;
    var scoreView=null;
    var alertView=new AlertView();
    var regionInfo=new RegionInfo(); //This is the view responsible for showing region information.
    this._upSpeed=GameDisplay.updateSpeed;

    var configLoaded=false;
    $.ajax({
        url:"game/client/data/renderConfig.json",
        dataType:"json",
        async:"false",
        success:function(data){
            console.log("Loaded render configuration");
            var colorData=data["PlayerColors"][0];
            var labelConfig=data["ArmyLabels"][0];
            dataView=new DataLayer(data);
            mapView=new MapView(dataCon,colorData);
            scoreView=new ScoreView(data,inList,dataCon);
            configLoaded=true;
        },
        error:function(xhr,ajaxOptions,thrownError){
            console.log("Error loading config file")
        }
    });


    //Load data and draw regions
    inList.addLayer(mapView);
    inList.addLayer(dataView);
    var interfaceCont=new InterfaceView(this,inList);

    var dataUpdate=new IntervalFunction(30,function(gameState){
        mapView.updateData(gameState);
        scoreView.update(dataCon,gameState);


    });

    this.gameLoop=function(){
        if(configLoaded){
            var timer=new Timer();
            var gameState=dataCon.getRegionStates();
            mapView.showClick(gameState,dataCon);

           dataUpdate.update(gameState);


            dataView.update(gameState);
            alertView.update(gameState["clickMessages"]);
            interfaceCont.update();
            var cText=gameState["clickMessages"];
            if(timer.getTime()>GameDisplay.maxTime){
                console.log("Too slow, game update time:"+timer.getTime()+"ms")
            }
            regionInfo.update(gameState,dataCon);
        }else{
            console.log("Waiting to load");
        }

    }
}

GameDisplay.maxTime=50;//The maximum time between rendering cycles.
GameDisplay.updateSpeed=30; //Number of cycles between updating the view.

GameDisplay.prototype.speedRender=function(){
    this._upSpeed--;
}

GameDisplay.prototype.slowRender=function(){
    console.log("Slow render");
    console.log(this._upSpeed);
    this._upSpeed++;
}

GameDisplay.prototype.getUpdateSpeed=function(){
    return this._upSpeed;
}
