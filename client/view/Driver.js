/**
 * Starts the client.
 * @param dataConnection. The object that will be used to get game state data to render.
 */
function startClient(dataConnection){
    var dataCon=dataConnection;
    var title=new TitleDisplay(200,0);

    //This is the main loop of the game
    var mapImg=new Image();
    mapImg.onload=function(){

        //Load background image for menu
        var bg=new Image();
        bg.onload=function(){
            var score=new ScoreDisplay(0,0,dataCon,bg);
            var disp=new MapDisplay(250,100,mapImg,dataCon,title,score,bg);
            setInterval(disp.gameLoop,30);
        }
        bg.src='images/background.jpg';
    }
    mapImg.src='images/map.png';
}

startClient(new LocalConnection());