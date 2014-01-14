


	function GameDisplay(){

		var canvas=document.getElementById("game");
		var g=canvas.getContext("2d");
		var inputListeners=new Inputs(canvas);

        var dataCon=new DataConnection();
	
		this.setupGame=function(){
			console.log("Setting up game");
        }

		this.gameLoop=function(){

            g.fillStyle="#FFFFFF";
			g.fillRect(0,0,1000,800);


            var gameState=dataCon.getGameState(); //Ask for the game state
            gameState.map(function(state){
                if(state.getOwner()==1){
                    g.fillStyle='#FF0000';
                }
                if(state.getOwner()==2){
                    g.fillStyle='#00FF00';
                }
                if(state.getOwner()==3){
                    g.fillStyle='#0000FF';
                }
                console.log(state.getX()+":"+state.getY()+":"+state.getSize());
                g.fillRect(state.getX(),state.getY(),state.getSize(),state.getSize());
            });

		}

	}

	//This is the main loop of the game


	var disp=new GameDisplay();
	disp.setupGame();
	disp.gameLoop();
	setInterval(disp.gameLoop,40);

