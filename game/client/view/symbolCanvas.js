/**
 * This file contains methods for drawing symbols to the game area.
 */
function SymbolCanvas(config){

    var ctx=getCanvas('symbols')
    ctx.scale(1.338,1.348)

    var symbols=config["ImageLocs"]

    /**
     * Draws the canvas
     * @param rData 
     * @param flags
     * @param symbols
     */
    this.drawSymbols=function(rData){
        var rifle=new Image();
        rifle.onload=function(){
            ctx.fillStyle = 'yellow';
            Object.keys(rData).forEach(function(reg){
                var d=rData[reg];
                var x=rData[reg]["x"]
                var y=rData[reg]["y"]
                ctx.drawImage(rifle,x,y,15,15*rifle.height/rifle.width)
            });

        }
        console.log(symbols["army"])
        rifle.src=symbols["army"]
    }
}


