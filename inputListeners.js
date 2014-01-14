 function Inputs(canvas){

	canvas.addEventListener("click",processClick,false);

	function processClick(e){

		var x=e.pageX;
		var y=e.pageY;
		console.log(x+":"+y);
	}

};