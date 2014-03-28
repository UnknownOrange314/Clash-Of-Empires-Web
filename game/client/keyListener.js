/**
 * Created by Gulu on 3/28/14.
 */
function KeyListener(dCon,svgView,symbolView,dataView){

    var dataCon=dCon;

    var layers=[];

    layers.push(svgView);
    layers.push(symbolView);
    layers.push(dataView);

    window.onkeyup=function(e){
        var key= e.keyCode ? e.keyCode: e.which;
        var info=dataCon.getMapInfo();
        if(key==81){
            layers.forEach(function(layer){
                layer.zoomIn(info);
            });
        }
        if(key==87){
            layers.forEach(function(layer){
               layer.zoomOut(info);
            });
        }
    }
}
