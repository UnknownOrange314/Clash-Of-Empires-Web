window.mathTests=function(){
    test("Math Test",function(){
        var a1=findAngle(1,0)
        ok(a1==0,"Angle:"+a1)

        var a2=findAngle(0,1)
        ok(a2==Math.PI/2,"Angle:"+a2)

        var a3=findAngle(-1,0)
        ok(a3==Math.PI,"Angle:"+a3)

        var a4=findAngle(0,-1)
        ok(a4==Math.PI*3/2,"Angle:"+a4)

        var a5=findAngle(-1,1)
        ok(a5==Math.PI*3/4,"Angle:"+a5)
    });
}

