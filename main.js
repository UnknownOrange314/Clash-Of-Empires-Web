
function Display(){

    return{
        getGraphics:function(){
            var canvas=document.getElementById("game");
            var g=canvas.getContext("2d");
            return g;
        }
    }

}
function ScoreDisplay(tX,tY,dCon,img){

    var dataConnection=dCon;
    var topX=tX;
    var topY=tY;


    var base=Display();
    var g=base.getGraphics();


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
        var disp=new MapDisplay(250,100,mapImg,dataCon,title,score,bg);
        setInterval(disp.gameLoop,30);
    }
    bg.src='images/background.jpg';
}

mapImg.src='images/map.png';


