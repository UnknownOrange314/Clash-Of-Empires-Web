/**
 *
 * @param topX The top x coordinate.
 * @param topY The top y coordinate.
 * @param mapImg The map image.
 * @param dataCon The object used to get rendering data.
 * @param titleView The panel that has the title.
 * @param scoreView The panel that has player score information.
 * @param background The background image for the game.
 * @constructor
 */
function MapDisplay(topX,topY,mapImg,dataCon,titleView,scoreView,background){


    var base=Display();
    var g=base.getGraphics();
    var inputListeners=new Inputs(base.getCanvas(),topX,topY,dataCon);


    this.gameLoop=function(){

        var gameState=dataCon.getRegionStates(); //Ask for the game state
        if(gameState==undefined){
            return;
        }

        g.drawImage(background,0,0);//Load a background.
        titleView.drawSelf();
        scoreView.drawSelf();
        g.drawImage(mapImg,topX,topY,mapImg.width/4,mapImg.height/4);

        gameState["regionStates"].map(function(state){
            if(state["owner"]==1){
                g.fillStyle='Red';
            }
            if(state["owner"]==2){
                g.fillStyle='White';
            }
            if(state["owner"]==3){
                g.fillStyle='Black';
            }
            if(state["owner"]==4){
                g.fillStyle='Purple';
            }
            if(state["owner"]==5){
                g.fillStyle='DarkOrange';
            }
            g.font='10pt Calibri';
            g.fillText(""+state["army"],state["xPos"]+10+topX,state["yPos"]+20+topY);
        });
        gameState["moveCommands"].map(function(state){
            g.beginPath();
            g.moveTo(state["x1"]+topX+10,state["y1"]+topY+10);
            g.lineTo(state["x2"]+topX+10,state["y2"]+topY+10);
            g.stroke();
        });

        //Indicate that an area has been clicked.

        var clickData=dataCon.getSavedClick();
        var x=clickData["x"];
        var y=clickData["y"];

        //g.save();
        //g.globalAlpha=.5;
        g.fillStyle='Black';
        g.rect(x,y,40,40);
        g.fillText("Click",x,y);
        //g.restore();

        /*
         var clicks=dataCon.getSavedClicks(); //Get the clicks that are saved

            -If there are no saved clicks, then end select animation
            -If there is one saved click, then end any existing select animation and
             start a new one for the region.
             -If there are two saved clicks......
         */

    }
}