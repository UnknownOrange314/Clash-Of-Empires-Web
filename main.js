/**
 *
 * @param topX The top x coordinate.
 * @param topY The top y coordinate.
 * @constructor
 */
function GameDisplay(tX,tY,map,dCon,t,s,bg){

    var dataCon=dCon;
    var mapImg=map;
    var topX=tX;
    var topY=tY;
    var canvas=document.getElementById("game");
    var g=canvas.getContext("2d");
    var inputListeners=new Inputs(canvas,tX,tY,dataCon);
    var background=bg;
    var titleView=t;
    var scoreView=s;


    this.setupGame=function(){
    }


    this.gameLoop=function(){

        g.drawImage(bg,0,0);//Load a background.

        titleView.drawSelf();
        scoreView.drawSelf();
        g.fillStyle="#FFFFFF";
        g.drawImage(mapImg,topX,topY,mapImg.width/4,mapImg.height/4);
        var gameState=dataCon.getRegionStates(); //Ask for the game state
        gameState.map(function(state){

            if(state.getOwner()==1){
                g.fillStyle='#FF0000';
            }
            if(state.getOwner()==2){
                g.fillStyle='#FFFFFF';
            }
            if(state.getOwner()==3){
                g.fillStyle='#000000';
            }
            if(state.getOwner()==4){
                g.fillStyle='#663399';
            }
            if(state.getOwner()==5){
                g.fillStyle='#FFA500';
            }
            g.strokeRect(state.getX()+tX,state.getY()+tY,state.getSize(),state.getSize());
            g.font='10pt Calibri';
            g.fillText(""+state.getArmy(),state.getX()+10+tX,state.getY()+20+tY);
        });
    }
}

function ScoreDisplay(tX,tY,dCon,img){


    var dataConnection=dCon;
    var topX=tX;
    var topY=tY;
    var canvas=document.getElementById("game");
    var g=canvas.getContext("2d");


    this.drawSelf=function(){

        g.fillStyle='#000000';
        g.font='20pt Calibri';

        var drawX=110;
        var drawY=topY+110;
        g.fillText("Player Scores",topX+30,drawY);


        var scores=dataCon.getPlayerStates();

        drawY+=100;
        g.fillStyle="#000000";
        g.font='10pt Calibri';
        for(var i=0;i<scores.length;i++){
            g.fillText(scores[i],drawX,drawY);
            drawY+=100;
        }
    }

}

function TitleDisplay(tX,tY){
    var topX=tX;
    var topY=tY;
    var canvas=document.getElementById("game");
    var g=canvas.getContext("2d");



    this.drawSelf=function(){
        g.font='40pt Calibri';
        g.fillStyle='#000000';
        g.fillText("Clash of Empires",tX+100,tY+50);
    }


}

var dataCon=new DataConnection();


var title=new TitleDisplay(200,0);

//This is the main loop of the game
var mapImg=new Image();
mapImg.onload=function(){

     //Load background image for menu
    var bg=new Image();
    bg.onload=function(){
        var score=new ScoreDisplay(0,0,dataCon,bg);
        var disp=new GameDisplay(250,100,mapImg,dataCon,title,score,bg);
        setInterval(disp.gameLoop,30);
    }
    bg.src='images/background.jpg';
}

mapImg.src='images/map.png';


