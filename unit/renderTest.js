/**
 * Make sure that the client runs without bugs
 **/
test("Test",function(){
    ok(1,"Render testing")
    startClient(new MockConnectionManager(),"Host")
})
