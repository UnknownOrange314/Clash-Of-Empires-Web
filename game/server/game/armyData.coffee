
class window.ArmyData

  constructor:()->
    @armies={}
    @troops=0


  ###
  * The attack power of a player when attacking from a region.
  * @param reg
  ###
  getAttackPower:(reg)->
    pow=Math.floor(Math.log(this.getArmy(reg)+2))
    return Math.min(this.getArmy(reg),pow)

  createArmy:(region)->
    @armies[region.hashCode()]=0

  addTroops:(region,tCount)->
    key=region.hashCode()
    if(!(key of @armies))
      @armies[key]=0

    @armies[region.hashCode()]+=tCount
    @troops+=tCount


  removeTroops:(region,tCount)->
    if(region.hashCode() of @armies)
      rCount=Math.min(this.getArmy(region),tCount)
      @armies[region.hashCode()]-=rCount
      @troops-=rCount



  getArmy:(region)->
    if((region.hashCode() of @armies))
      return @armies[region.hashCode()]


  getSize:()->
    return @troops






