
var TextSlant = function( target, lineHeight, textWidth, boxWidth, increment ) {
	var out = '',
	remainderWidth = boxWidth - textWidth,
	smallSideWidth = 0;

	while( remainderWidth > 0 ) {
		out += '<div style="float:left;clear:left;height:'+lineHeight+';width:'+ smallSideWidth +'px"></div>';
		out += '<div style="float:right;clear:right;height:'+lineHeight+';width:'+ remainderWidth +'px"></div>';
		smallSideWidth += increment;
		remainderWidth -= increment;
	}

	target.prepend(out);
}

/*
@project Helper

@author Adriaan Scholvinck | adriaan@BALT.us | BALT.us
@description Draw shapes with canvas
*/

var DrawShape = function( target, color, width, height ) {
	console.log ( "color: ", color, target );
	color = color == undefined?'#fff':color;
	var canvas = document.getElementById(target).getContext('2d');
	canvas.fillStyle = color;
	canvas.beginPath();

	var halfW = Math.floor(width/2);
	console.log ( "halfW ", halfW, height, width );

	canvas.moveTo(0, 0);
	canvas.lineTo(width, 0);
	canvas.lineTo(width, height*2);
	canvas.lineTo(halfW, height);

	canvas.closePath();
	canvas.fill();
};