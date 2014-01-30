
function getColor(pNum){
    if(pNum==1){
        return 'Red';
    }
    if(pNum==2){
        return 'White';
    }
    if(pNum==3){
        return 'Blue';
    }
    if(pNum==4){
        return 'Purple';
    }
    if(pNum==5){
        return 'DarkOrange';
    }
    return 'Green';
}


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
function MapDisplay(topX,topY,mapImg,dataCon,titleView,scoreView,background,pName){

    var base=Display();
    var g=base.getGraphics();
    var inputListeners=new Inputs(base.getCanvas(),topX,topY,dataCon,pName);

    function transX(x){
        return x+topX;
    }

    function transY(y){
        return y+topY;
    }

    this.gameLoop=function(){

        var start=new Date().getTime();

        var gameState=dataCon.getRegionStates(); //Ask for the game state
        if(gameState==undefined){
            return;
        }

        g.drawImage(background,0,0);//Load a background.
        titleView.drawSelf();
        scoreView.drawSelf();
        g.drawImage(mapImg,topX,topY,mapImg.width/4,mapImg.height/4);

        gameState["regionStates"].map(function(state){
            g.fillStyle=getColor(state["owner"]);
            g.font='10pt Calibri';
            g.fillText(""+state["army"],transX(state["xPos"])+10,transY(state["yPos"])+20);

            g.fillStyle='black';
            var sX=transX(state["xPos"]);
            var sY=transY(state["yPos"]);
            var width=Math.floor(30.0*state["hitPoints"]/1000.0);
            g.fillRect(sX,sY,width,10);
            console.log("Hit points:"+state["hitPoints"]);
        });

        gameState["moveCommands"][pName].forEach(function(state){
            g.beginPath();
            g.moveTo(transX(state["x1"]+10),transY(state["y1"])+10);
            g.lineTo(transX(state["x2"]+10),transY(state["y2"])+10);
            g.stroke();
        });
        //Indicate that an area has been clicked.
        var clickData=dataCon.getSavedClick();
        var x=clickData["x"];
        var y=clickData["y"];

        g.fillStyle='Black';
        g.rect(x,y,40,40);
        g.fillText("Click",transX(x),transY(y));

        var end=new Date().getTime();
        //console.log("Time "+(end-start));
    }
}
