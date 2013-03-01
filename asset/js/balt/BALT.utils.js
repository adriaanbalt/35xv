
var TextSlant = function( target, lineHeight, boxWidth, increment ) {
	var out = '',
	remainderWidth = boxWidth;// - textWidth,
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

var DrawShape = function( target, color, width, height, type, overhang ) {
	color = color == undefined?'#fff':color;
	overhang = overhang == undefined?100:overhang;

	if(window['G_vmlCanvasManager'] && !document.getElementById(target).getContext) G_vmlCanvasManager.initElement( document.getElementById(target) );

	var canvas = document.getElementById(target).getContext('2d');
	canvas.fillStyle = color;
	canvas.beginPath();
	canvas.moveTo(0, 0);

	if ( type == 'trapezoid'){
		width -= (overhang);
		canvas.lineTo(width, 0);
		canvas.lineTo(width+overhang, height);
		canvas.lineTo(overhang, height);
	} else if ( type == 'parallelogram' ) {
		canvas.lineTo(width, 0);
		canvas.lineTo(width, height);
		canvas.lineTo(overhang, height);
	}

	canvas.closePath();
	canvas.fill();

//	console.log ( "shape: ", color, target, width, height, type, overhang );
};

var hexToRgb = function(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

var componentToHex = function(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

var rgbToHex = function(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}