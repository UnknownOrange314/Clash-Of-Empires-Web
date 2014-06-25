/*
 * Starts the client.
 * @param dataConnection The object that will be used to get game state data to render.
 * @param pName The player name.
 */
(function() {
  var startClient;

  startClient = function(dataCon, pName) {
    dataCon.registerPlayer(pName);
    var disp = new MapDisplay(dataCon, pName, $("body"));
    return setInterval(disp.gameLoop, 40);
  };

  window.startClient = startClient;

}).call(this);

