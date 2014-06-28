window.regionTests=function(){
    test("Region test",function(){
        var reg=new Region(2,2,2);
        var p=new Player(1);
        reg.setOwner(p);
        ok(reg.getOwner()!=undefined);
        var rData=reg.exportState();
        ok(rData!==null,"Region can be rendered");
        equal(rData["xPos"],"2");
        equal(rData["yPos"],"2");

        var reg2=new Region(2,3,2);
        ok(reg2.distance(reg)===1,"Testing region distance");
        reg.addBorder(reg2);
        reg2.addBorder(reg);
        ok(reg2.hasBorder(reg)===true,"Has border");
        ok(reg.hasBorder(reg2)===true,"Has border");
        equal(reg.getBorders().size(),1,"Testing correct border count:");
        equal(reg2.getBorders().size(),1,"Testing correct border count:");
    });

    test("Region render state test",function(){
        var reg=new Region(2,2,2);
        var p=new Player(1);
        reg.setOwner(p);
        var renderState=reg.exportState();
        ok(renderState["owner"]>-1&&renderState["owner"]<10,"Testing owner");
        ok(renderState["xPos"]==2,"Correct xPos state");
        ok(renderState["yPos"]==2,"Correct yPos state");
    });
}




