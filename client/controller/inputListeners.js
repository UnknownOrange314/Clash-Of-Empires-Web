/**
 * This is used to process input.
 * @param canvas The HTML5 canvas with the display.
 * @constructor
 */
function Inputs(canvas){

	canvas.addEventListener("click",processClick,false);

    /**
     * Process a click.
     * @param e Click event data.
     */
	function processClick(e){
		var x=e.pageX;
		var y=e.pageY;
		console.log(x+":"+y);
	}

};