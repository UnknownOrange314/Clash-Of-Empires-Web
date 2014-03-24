/**
 * Created by Gulu on 3/24/14.
 */
function MockConnectionManager(){

   // var mapData=null
    var testData=null
    var playerData=null

    $.ajax({
        url:"unit/render/testData.json",
        dataType:"json",
        async:"false",
        success:function(data){
            testData=data
        },
        error:function(xhr,ajaxOptions,thrownError){
            console.log("Error loading test data")
        }
    })

    $.ajax({
        url:"unit/render/testPlayerData.json",
        dataType:"json",
        async:"false",
        success:function(data){
            playerData=data
        },
        error:function(xhr,ajaxOptions,thrownError){
            console.log("Error loading test data")
        }
    })

    this.getMapInfo=function(){

    }

    this.getPlayerState=function(){
        return playerData
    }

    this.getRegionStates=function(){
        return testData
    }


    this.registerPlayer=function(pName){

    }

    this.getSavedClick=function(){
        return null
    }

}
