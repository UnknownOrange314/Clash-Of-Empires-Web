/**
 * This file contains methods for drawing symbols to the game area.
 */
function SymbolCanvas(config){

    var ctx=getCanvas('symbols')
    ctx.scale(1.338,1.348)

    var symbols=config["ImageLocs"]
    var flags=loadFlags(config["FlagData"])

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
            var size=40
            var h=100
            var dH=60
            for(var key in flags){
                console.log("Flag"+flags[key])
                var img=flags[key]
                ctx.drawImage(img,20,h,size,size*img.height/img.width)
                h+=dH
            }
        }
        console.log(symbols["army"])
        rifle.src=symbols["army"]
    }
}


