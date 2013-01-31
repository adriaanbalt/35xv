/*
@description Draw Shapes with Canvas
*/

var drawing = {};

drawing.canvasList = [];

drawing.drawBGShapes = function() {
	
	// Loop thru all the dom elements with the drawing-shape class and draw on them based on their attr
	$('.drawing-shape').each(function(index){
		var ctx, pointList, $target = $(this),
			maxSize = 300,
			container = $(window);
			
		// figure out max dimensions
		var side = (container.width() > container.height()) ? container.width() : container.height();
		
		var shapeType = $target.attr("drawing-shape-type");

		if(shapeType == "parallelogram") {
			
			var pWidth = Math.floor($target.attr("parallelogram-width"));

			//console.log('drawParallelogram ' + pWidth);

			// fugre out how many elements per side we need
			var tileCount = 1;
				
			while ( ((side+pWidth) / tileCount ) > maxSize) {
				tileCount++;
			}

			// set tile size
			var tileSize = Math.ceil((side+pWidth) / tileCount);
			
			// size container to tile sizes;
			//$target.width(tileSize*tileCount).height(tileSize*tileCount);
			$target.width( tileSize*tileCount ).height( side );
			$target.css({
				'overflow': 'hidden'
			});

			var shape = [
					{ x: 0, y: 0},
					{ x: side, y: side},
					{ x: side + pWidth, y: side},
					{ x: pWidth, y: 0 },
					{ x: 0, y: 0}];

			
			// create canvas tiles and fill them into container
			var rowCount = 0, colCount = 0, cElem, offsetLeft, offsetRight;

			for (var i = 0, count = tileCount*tileCount; i < count; i++) {
				cElem = $('<canvas></canvas>'),
				offsetLeft = tileSize * colCount,
				offsetRight = tileSize * rowCount;

				cElem.attr('width', tileSize).attr('height', tileSize);
				cElem.css({
					//'border':'2px solid rgba(255,0,0,.5)',
					'display': 'block',
					'position':'absolute',
					'left': offsetLeft + 'px',
					'top': offsetRight + 'px'
				}).addClass('hwaccel');

				//drawing.drawShape.call( cElem, $target, shape );
				drawing.canvasList.push({
						cElem: cElem,
						target: $target,
						shape: shape
					});


				$target.append(cElem);

				colCount++;
				if (colCount == tileCount) {
					colCount = 0;
					rowCount++;
				}
			}
			
			setTimeout(drawing.drawCanvasList, 100);

		} else if(shapeType == "line") {
			// For versions of IE that don't support canvas
			if(window['G_vmlCanvasManager'] && !this.getContext) G_vmlCanvasManager.initElement(this);
			
			ctx = this.getContext("2d");
			
			ctx.beginPath();
			pointList = $target.attr("drawing-shape-metrics").split(',');
			ctx.lineWidth = $target.attr("drawing-shape-line-width");
			ctx.strokeStyle = $target.attr("drawing-shape-line-color") || "#0000FF";
			drawing.drawLine(ctx, pointList);
			ctx.stroke();
			ctx.closePath();
		}
		

    });
};



drawing.drawCanvasList = function() {
	canvasList = drawing.canvasList;
	for (i in canvasList) {
		var c = canvasList[i];
		drawing.drawShape.call( c.cElem, c.target, c.shape );
	}
}


drawing.drawShape = function( target, shape ) {
	var canvas = this[0];

	var thisShape = [];

	var draw = true;

	for (var i = 0, count = shape.length; i < count; i++) {
		var to = shape[i];
			
		thisShape.push({
			x: to.x - parseInt( this.css('left') ), 
			y: to.y - parseInt( this.css('top') )
		});
	};


	if (draw) {
		if (window['G_vmlCanvasManager'] && !canvas.getContext)G_vmlCanvasManager.initElement(canvas);

		var ctx = canvas.getContext("2d");
		ctx.fillStyle = target.attr("drawing-shape-fill-color") || "#00FF00";
		ctx.beginPath();

		for (var i = 0, count = thisShape.length; i < count; i++) {
			
			if (i === 0) {
				ctx.moveTo( thisShape[i].x, thisShape[i].y);
			} else {
				ctx.lineTo( thisShape[i].x, thisShape[i].y);
			}
			
		}
		
		ctx.fill();
		ctx.closePath();
	}
}


drawing.drawParallelogram = function(ctx, width, wWidth, wHeight)
{
	var height = wHeight;

	ctx.moveTo(0, 0);
	ctx.lineTo(width, 0);
	ctx.lineTo(width + height, height);
	console.log('drawParallelogram ' + (width + height) + " x" + height);
	ctx.lineTo(height, height);
	ctx.lineTo(0, 0);
	
}

drawing.drawLine = function(ctx, pointList)
{
	
	ctx.moveTo(pointList[0], pointList[1]);
	for(var i = 2, count = pointList.length; i < count; i+=2)
	{
		ctx.lineTo(pointList[i],pointList[i+1]);
	}
	
}
