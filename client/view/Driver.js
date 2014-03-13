/**
 * Starts the client.
 * @param dataConnection The object that will be used to get game state data to render.
 * @param pName The player name.
 */
function startClient(dataConnection,pName){
    var dataCon=dataConnection;
    dataCon.registerPlayer(pName);
    var disp=new MapDisplay(dataCon,pName);
    setInterval(disp.gameLoop,40);
}
startClient(new LocalConnection(),"Host");
