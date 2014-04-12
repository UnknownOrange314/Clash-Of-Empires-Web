

/**
 * This panel is responsible for showing important alerts about the game.
 * @constructor
 */
function AlertView(){

    var ctx=getCanvas('alerts');
    var panel=new Panel(0,0,710,100,ctx);

    this.update=function(messages){
        panel.refresh();
        ctx.fillStyle="#000000";
        ctx.font='30pt Calibri';
        var sX=10;
        var sY=30;
        var dH=30;
        ctx.fillStyle="#FFFFFF";
        ctx.font='14pt Calibri';
        for(var i=0;i<messages.length;i++){
            ctx.fillText(messages[i],sX,sY);
            sY+=dH
        }
    }

}



