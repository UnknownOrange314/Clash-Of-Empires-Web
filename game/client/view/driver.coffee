###
 * Starts the client.
 * @param dataConnection The object that will be used to get game state data to render.
 * @param pName The player name.
###
startClient=(dataConnection,pName)->
  console.log("Starting client")
  dataCon=dataConnection
  dataCon.registerPlayer(pName)
  disp=new MapDisplay(dataCon,pName,$("body"))
  setInterval(disp.gameLoop,40)

window.startClient=startClient

