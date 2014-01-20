function TitleDisplay(tX,tY){

    var topX=tX;
    var topY=tY;
    var base=Display();
    var g=base.getGraphics();

    this.drawSelf=function(){
        g.font='40pt Calibri';
        g.fillStyle='Black';
        g.fillText("Clash of Empires",tX+100,tY+50);
    }
}
