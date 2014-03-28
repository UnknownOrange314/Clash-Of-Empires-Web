function ScoreView(config){

    var h=1000
    var w=200

    var startH=150

    /**
     * This function is responsible for drawing the score panel.
     * It should probably be
     * @param flags
     */
    var drawPanel=function(flags){

        var ctx=getCanvas('score')
        ctx.fillStyle="#C0C0C0"
        ctx.fillRect(0,0,w,1000)
        ctx.fillStyle="#000000"
        ctx.font='40pt Calibri'
        ctx.fillText("Score",50,80)
        var size=40
        var xPos=50
        var h=startH
        var dH=60
        //TODO: Make sure that the names are not hardcoded.
        var names=new Array("Russia","Turkey","France","England")
        ctx.fillStyle="#000000"
        ctx.font='10pt Calibri'
        var textIdx=0;

        for(var key in flags){
            console.log("Flag"+flags[key])
            var img=flags[key]
            ctx.fillText(names[textIdx],xPos,h-10)
            ctx.drawImage(img,xPos,h,size,size*img.height/img.width)
            h+=dH
            textIdx++
        }
    }

    var ctx=getCanvas('score')
    loadFlags(config["FlagData"],drawPanel)

    this.update=function(dataCon){
        var ctx=getCanvas('score')

        ctx.fillStyle="#C0C0C0"
        ctx.fillRect(100,100,w-100,1000)

        var pData=dataCon.getPlayerState()
        var x=120
        var y=startH
        var dH=60
        Object.keys(pData).forEach(function(name){
            ctx.fillStyle="#000000"
            ctx.font='10pt Calibri'
            ctx.fillText(pData[name]["score"],x,y)
            y+=dH
        });
    }
}