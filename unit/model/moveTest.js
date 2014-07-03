window.moveTest=function(){
    test("Move test",function(){

        //Players cannot take over region because players cannot lose their last two regions.
        //Players take damage even when there are no troops in a region.
        var r0=new Region(200,200.1);
        var r1=new Region(0,0,1);
        var r2=new Region(100,100,1);
        var r3=new Region(3,3);
        var r4=new Region(4,4);

        var p1=new Player(1,new NoAI("P1"),new MajorPower());
        var p2=new Player(2,new NoAI("P2"),new MajorPower());

        r0.setOwner(p1);
        r1.setOwner(p1);
        r2.setOwner(p2);
        r3.setOwner(p2);
        r4.setOwner(p2);
        r0.addBorder(r1);
        r0.addBorder(r2);
        r1.addBorder(r0);
        r1.addBorder(r2);
        r2.addBorder(r0);
        r2.addBorder(r1);

        p1.addTroops(r0,50);
        p1.addTroops(r1,500);
        p2.addTroops(r2,100);

        var move=new MoveCommand(r1,r2);
        var max=999;
        while(r2.getOwner()!==p1&&(max>-1)){
            if(max===0){
                ok(0,"Taking too long");
            }
            max--;
            move.execute(p1);

        }
        ok(r1.getOwner()===p1,"Player still has old region");

        move.execute(p1);
        ok(p1.getArmy(r1)<500,"Army size:"+p1.getArmy(r1));
        ok(p1.getArmy(r1)>10,"Army size:"+p1.getArmy(r1));
        ok(p1.getArmy(r2)>0,"Size of army in conquered region:"+p1.getArmy(r2));
        ok(p2.getArmy(r2)===0,"Army size"+p2.getArmy(r2));

        //Make sure region borders are not being modified.
        for(var i=0;i<10;i++){
            p1.update();
            p2.update();
            equal(r0.getBorders().size(),2);
            equal(r1.getBorders().size(),2);
            equal(r2.getBorders().size(),2);


        }
    });

    test("Attacking capital test",function(){

        var map=new GameManager(new TestGen());
        var players=map.getPlayers();
        var regions=map.getRegions();
        var r1=players[0].getCapital();
        var aReg=regions[7];

        var move=new MoveCommand(aReg,r1);
        players[0].addTroops(r1,9999);
        aReg.getOwner().addTroops(aReg,9999);

        notEqual(aReg.getOwner(),players[0]);
        for(var i=0;i<20;i++){
            move.execute(aReg.getOwner());
        }
        var aOwn=aReg.getOwner();
        var c1=aOwn.getArmy(aReg);
        var c2=players[0].getArmy(r1);
        ok(c1<c2,"Troop counts "+c1+":"+c2);
    });

}
