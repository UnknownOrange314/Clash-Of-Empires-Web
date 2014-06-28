window.pointTests=function(){
    test("Point tests",function(){
        var p=new Point(1,1);
        ok(p.getX()===1,"Testing xPos");
        ok(p.getY()===1,"Testing yPos");

        var p2=new Point(1,1);
        ok(p.distance(p2)==0,"Testing distance to same location");

        var p3=new Point(2,1);
        ok(p.distance(p3)===1,"Testing distance");

        var p4=new Point(50,1);
        ok(p.distance(p4)==49,"Testing distance:"+ p.distance(p4));

        var p5=new Point(4,5);
        ok(p.distance(p5)===5,"Testing distance:"+ p.distance(p5));
    });
}
