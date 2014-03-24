function loadFlags(flagData){
    var imgData={}
    for(key in flagData){
        imgData[key]=new Image()
        imgData[key].onLoad=function(){
            console.log("Loaded image")
        }
        imgData[key].src=flagData[key]
    }
    console.log(JSON.stringify(imgData))
    return imgData
}