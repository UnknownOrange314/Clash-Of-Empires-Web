/**
 * This panel is responsible for showing important alerts about the game.
 * @constructor
 */
function AlertView(){
    var ctx=getCanvas('alerts')
    this.update=function(messages){

        ctx.fillStyle="#C0C0C0"
        ctx.fillRect(0,0,700,100)
        ctx.fillStyle="#000000"
        ctx.font='30pt Calibri'
       // ctx.fillText("Score",50,50)

        var sX=10
        var sY=30
        var dH=30;
        ctx.font='12pt Calibri'
        for(var i=0;i<messages.length;i++){
            ctx.fillText(messages[i],sX,sY)
            sY+=dH
        }
    }

}