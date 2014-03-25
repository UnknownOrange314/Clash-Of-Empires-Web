/**
 * Loads the country flags.
 * @param flagData The data about where the flags are.
 * @param drawFun The function that draws the flags.
 */
function loadFlags(flagData,drawFun){

    var imgData={}
    var names=[]
    var locs=[]
    for(var key in flagData){
        names.push(key)
        locs.push(flagData[key])
    }
    function loadImage(loadIdx){
        if(loadIdx>=names.length){ //We are done loading the images.
            drawFun(imgData)
        }
        var name=names[loadIdx]
        var imgLoc=locs[loadIdx]
        imgData[name]=new Image()
        imgData[name].onload=function(){
            loadImage(loadIdx+1)
        }
        imgData[name].src=imgLoc
    }
    loadImage(0)
}