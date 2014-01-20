
function Display(){

    return{
        getGraphics:function(){
            var canvas=document.getElementById("game");
            var g=canvas.getContext("2d");
            return g;
        },
        getCanvas:function(){
            return document.getElementById("game");
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
        var scores=dataConnection.getPlayerStates();

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
    var base=Display();
    var g=base.getGraphics();

    this.drawSelf=function(){
        g.font='40pt Calibri';
        g.fillStyle='#000000';
        g.fillText("Clash of Empires",tX+100,tY+50);
    }
}





