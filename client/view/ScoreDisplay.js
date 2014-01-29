function ScoreDisplay(topX,topY,dataConnection,img){

    var base=Display();
    var g=base.getGraphics();

    this.drawSelf=function(){

        g.fillStyle='Black';
        g.font='20pt Calibri';
        var drawX=110;
        var drawY=topY+110;

        g.fillText("Player Scores",topX+30,drawY);
        var pData=dataConnection.getPlayerInfo();
        drawY+=100;
        g.fillStyle="#Black";
        g.font='10pt Calibri';
        Object.keys(pData).forEach(function(name){
            g.fillStyle= getColor(pData[name]["num"]);
            g.fillText(name+":"+pData[name]["score"],drawX,drawY);
            drawY+=100;
        });
        for(var i=0;i<pData.length;i++){
            var info=pData[i];
        }
    }
}