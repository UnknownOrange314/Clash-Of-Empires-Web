/**
 *
 * @param tX The top x coordinate.
 * @param tY The top y coordinate.
 * @param map The map image.
 * @param dCon The object used to get rendering data.
 * @param t The panel that has the title.
 * @param s The panel that has player score information.
 * @param bg The background image for the game.
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

    this.gameLoop=function(){

        var gameState=dataCon.getRegionStates(); //Ask for the game state
        if(gameState==undefined){
            return;
        }

        g.drawImage(bg,0,0);//Load a background.
        titleView.drawSelf();
        scoreView.drawSelf();
        g.drawImage(mapImg,topX,topY,mapImg.width/4,mapImg.height/4);

        gameState.map(function(state){
            if(state[0]==1){
                g.fillStyle='Red';
            }
            if(state[0]==2){
                g.fillStyle='White';
            }
            if(state[0]==3){
                g.fillStyle='Black';
            }
            if(state[0]==4){
                g.fillStyle='Purple';
            }
            if(state[0]==5){
                g.fillStyle='DarkOrange';
            }
            g.font='10pt Calibri';
            g.fillText(""+state[4],state[1]+10+tX,state[2]+20+tY);
        });
    }
}