###
 * This file is used to manage connections with the client.
 * @constructor
###

class window.connectionManager

  constructor:()->
    @game=null
    $.ajaxSetup({"async":false});
    $.getJSON("game/server/maps/europe/Europe.json",(json)=>
      @game=new GameManager(new Europe(json))
    )



  ###
     * Gets information about the map.
  ###
  getMapInfo:()->
    console.log(@game.getMapInfo())
    return @game.getMapInfo()


  ###
     * Gets information about each player.
  ###
  getPlayerState:()->
    return @game.getPlayerState()


  ###
       * Gets information about each region.
  ###
  getRegionStates:()->
    return @game.updateState()


  ###
       * Return the clicks that a player made.
  ###
  getSavedClick:()->
    return @game.getFirstClick()


  ###
     * Sends information about the click to the server.
     * @param data Information about the click.
     * @param pName The player that made the click.

  ###
  sendClick:(data,pName)->
    @game.processClick(data,pName)


  ###
     * Adds information about a client player to the server.
     * @param pName The player that is being added.
  ###
  registerPlayer:(pName)->
    @game.registerPlayer(pName)

