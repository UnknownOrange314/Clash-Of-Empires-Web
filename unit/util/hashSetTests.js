window.hashSetTests=function(){
    /**
     * Tests to make sure that hash sets are working.
     */
    test("Addition test",function(){
        var set=new HashSet(function(reg){
            return reg.hashCode();
        });
        var reg=new Region(1,1);
        set.push(reg);
        set.push(reg);
        equal(set.size(),1);

    });
    test("Contains test",function(){
        var set=new HashSet(function(reg){
            return reg.hashCode();
        });
        var reg=new Region(1,1);
        var r2=new Region(2,2);
        set.push(reg);
        ok(set.contains(reg));
        ok(!set.contains(r2));
    });

    test("Remove test",function(){
        var set=new HashSet(function(reg){
            return reg.hashCode();
        });
        var reg=new Region(1,1);
        var r2=new Region(2,2);
        set.push(reg);
        set.push(r2);
        set.remove(r2);
        set.remove(r2);
        equal(set.size(),1);
        ok(!set.contains(r2));

        set.remove(new Region(1,33));
        equal(set.size(),1);

    });
}
