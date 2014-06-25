/**
 *
 * This object is for handing user interface interactions
 * such as zooming and scrolling.
 * @param mapDisplay The object used to display the game.
 * @constructor
 */
function InterfaceView(mapDisplay,inListener){


    var ctx=getCanvas(InterfaceView.canvasName);
    var w=getWidth(InterfaceView.canvasName);
    var h=getHeight(InterfaceView.canvasName);

    var zIn=new Button(40,80,"Zoom in", inListener.zoomIn);
    var zOut=new Button(40,140,"Zoom out",inListener.zoomOut);
    var dSpeed=new Button(340,80,"Decrease speed",inListener.slowRender);
    var iSpeed=new Button(340,140,"Increase speed",inListener.speedRender);

    var buttons=Array();
    buttons.push(zIn);
    buttons.push(zOut);
    buttons.push(dSpeed);
    buttons.push(iSpeed);

    var title=new Label("Interface",40,40,20);
    var title=new Label("Interface",40,40,20);
    var speed=new Label("Speed",520,170,14);
    var labels=Array();
    labels.push(title);
    labels.push(speed);


    this.update=function(){
        ctx.fillStyle="#1A1D44";
        ctx.fillRect(0,0,w,h);
        speed.setText("Speed:"+mapDisplay.getUpdateSpeed())
        labels.forEach(function(lb){
            lb.draw(ctx);
        })
        buttons.forEach(function(btn){
            btn.draw(ctx);
        })
    }

    $("#interface").click(function(e){
        var cData=transformClick(e,ctx);
        var x=cData[0];
        var y=cData[1]-1040; //TODO: Make sure this value is not hardcoded.

        //TODO: Create button object
        buttons.forEach(function(btn){
            btn.checkClick(x,y);
        });


    });
}
InterfaceView.canvasName='interface'




