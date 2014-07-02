/*
 * Starts the client.
 * @param dataConnection The object that will be used to get game state data to render.
 * @param pName The player name.
 */
window.startClient=function(dataCon,pName){
    dataCon.registerPlayerClicks(pName);
    var disp = new GameDisplay(dataCon, pName, $("body"));
    return setInterval(disp.gameLoop, 40);
}