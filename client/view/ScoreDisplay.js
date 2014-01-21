function ScoreDisplay(topX,topY,dataConnection,img){


    var base=Display();
    var g=base.getGraphics();


    this.drawSelf=function(){

        g.fillStyle='Black';
        g.font='20pt Calibri';
        var drawX=110;
        var drawY=topY+110;

        g.fillText("Player Scores",topX+30,drawY);
        var scores=dataConnection.getPlayerStates();

        drawY+=100;
        g.fillStyle="#Black";
        g.font='10pt Calibri';
        for(var i=0;i<scores.length;i++){
            g.fillText(scores[i],drawX,drawY);
            drawY+=100;
        }
    }
}