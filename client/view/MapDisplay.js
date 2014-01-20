
/**
 *
 * @param topX The top x coordinate.
 * @param topY The top y coordinate.
 * @constructor
 */
function MapDisplay(tX,tY,map,dCon,t,s,bg){

    var dataCon=dCon;
    var mapImg=map;
    var topX=tX;
    var topY=tY;
    var base=Display();
    var g=base.getGraphics();
    var inputListeners=new Inputs(base.getCanvas(),tX,tY,dataCon);
    var background=bg;
    var titleView=t;
    var scoreView=s;


    this.setupGame=function(){
    }


    this.gameLoop=function(){

        var gameState=dataCon.getRegionStates(); //Ask for the game state
        console.log(gameState);
        if(gameState==undefined){
            return;
        }
        console.log("Drawing");
        g.drawImage(bg,0,0);//Load a background.

        titleView.drawSelf();
        scoreView.drawSelf();
        g.fillStyle="#FFFFFF";
        g.drawImage(mapImg,topX,topY,mapImg.width/4,mapImg.height/4);



        gameState.map(function(state){

            if(state[0]==1){
                g.fillStyle='#FF0000';
            }
            if(state[0]==2){
                g.fillStyle='#FFFFFF';
            }
            if(state[0]==3){
                g.fillStyle='#000000';
            }
            if(state[0]==4){
                g.fillStyle='#663399';
            }
            if(state[0]==5){
                g.fillStyle='#FFA500';
            }
            g.font='10pt Calibri';
            g.fillText(""+state[4],state[1]+10+tX,state[2]+20+tY);
        });
    }
}