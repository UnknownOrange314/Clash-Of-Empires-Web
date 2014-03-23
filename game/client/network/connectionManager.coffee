###
 * This file is used to manage connections with the client.
 * @constructor
###

class window.connectionManager

  constructor:()->
    console.log("Loading")
    @game=null


    $.ajaxSetup({"async":false});
    $.getJSON("game/server/maps/europe/Europe.json",(json)=>
      @game=new GameManager(new Europe(json))
      console.log("Creating game")
      console.log("Hi")
    )



  ###
     * Gets information about the map.
  ###
  getMapInfo:()->
    a=11
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
    console.log("Registering player"+@game.getPlayers())
    @game.registerPlayer(pName)

