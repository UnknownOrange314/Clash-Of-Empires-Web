class window.DisplayCache

  constructor: () ->
    @updateQueue={}
    @regionData={}


  updateReg:(rName,owner)->
    if @regionData[rName]!=owner
      @regionData[rName]=owner
      @updateQueue[rName]=owner

  firstUpdate:()->
    for k,v of @updateQueue
      return k

  getUpdate:()->
    key=@firstUpdate()
    data={}
    data["name"]=key
    data["owner"]=@updateQueue[key]
    delete @updateQueue[key]
    return data

  hasUpdates:()->
    return Object.keys(@updateQueue).length>0







