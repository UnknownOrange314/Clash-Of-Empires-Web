window.playerTests=function(){
    //Player Tests
    test("Army size test",function(){
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


        p1.addTroops(r0,50);
        p1.addTroops(r1,500);
        p2.addTroops(r2,100);

        ok(p1.getArmy(r0)===50);
        ok(p1.getArmy(r1)===500,"Army size:"+p1.getArmy(r1));
        ok(p1.getArmy(r2)===0,"Army size in r2:"+p1.getArmy(r2));
        ok(p2.getArmy(r2)===100,"Army size:"+p2.getArmy(r2));
    });
}
