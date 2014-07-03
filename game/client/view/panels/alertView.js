

/**
 * This panel is responsible for showing important alerts about the game.
 * @constructor
 */
function AlertView(){

    var panel=new Panel(0,0,710,100,'alerts',"rgb(26,29,69)");

    this.update=function(messages){
        panel.fillBackground();
        var sX=10;
        var sY=30;
        var dH=30;
        panel.setColor("#FFFFFF");
        panel.setFont("14pt Calibri");
        for(var i=0;i<messages.length;i++){
            panel.fillText(messages[i],sX,sY);
            sY+=dH;
        }
    }
}