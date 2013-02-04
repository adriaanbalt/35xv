var drawing={}
drawing.canvasList=[],drawing.drawBGShapes=function(){$(".drawing-shape").each(function(){var a,t,i=$(this),e=300,n=$(window),r=n.width()>n.height()?n.width():n.height(),s=i.attr("drawing-shape-type")
if("parallelogram"==s){for(var l=Math.floor(i.attr("parallelogram-width")),o=1;(r+l)/o>e;)o++
var h=Math.ceil((r+l)/o)
i.width(h*o).height(r),i.css({overflow:"hidden"})
for(var d,g,w,v=[{x:0,y:0},{x:r,y:r},{x:r+l,y:r},{x:l,y:0},{x:0,y:0}],c=0,p=0,f=0,m=o*o;m>f;f++)d=$("<canvas></canvas>"),g=h*p,w=h*c,d.attr("width",h).attr("height",h),d.css({display:"block",position:"absolute",left:g+"px",top:w+"px"}).addClass("hwaccel"),drawing.canvasList.push({cElem:d,target:i,shape:v}),i.append(d),p++,p==o&&(p=0,c++)
setTimeout(drawing.drawCanvasList,100)}else"line"==s&&(window.G_vmlCanvasManager&&!this.getContext&&G_vmlCanvasManager.initElement(this),a=this.getContext("2d"),a.beginPath(),t=i.attr("drawing-shape-metrics").split(","),a.lineWidth=i.attr("drawing-shape-line-width"),a.strokeStyle=i.attr("drawing-shape-line-color")||"#0000FF",drawing.drawLine(a,t),a.stroke(),a.closePath())})},drawing.drawCanvasList=function(){canvasList=drawing.canvasList
for(i in canvasList){var a=canvasList[i]
drawing.drawShape.call(a.cElem,a.target,a.shape)}},drawing.drawShape=function(a,t){for(var i=this[0],e=[],n=!0,r=0,s=t.length;s>r;r++){var l=t[r]
e.push({x:l.x-parseInt(this.css("left")),y:l.y-parseInt(this.css("top"))})}if(n){window.G_vmlCanvasManager&&!i.getContext&&G_vmlCanvasManager.initElement(i)
var o=i.getContext("2d")
o.fillStyle=a.attr("drawing-shape-fill-color")||"#00FF00",o.beginPath()
for(var r=0,s=e.length;s>r;r++)0===r?o.moveTo(e[r].x,e[r].y):o.lineTo(e[r].x,e[r].y)
o.fill(),o.closePath()}},drawing.drawParallelogram=function(a,t,i,e){var n=e
a.moveTo(0,0),a.lineTo(t,0),a.lineTo(t+n,n),console.log("drawParallelogram "+(t+n)+" x"+n),a.lineTo(n,n),a.lineTo(0,0)},drawing.drawLine=function(a,t){a.moveTo(t[0],t[1])
for(var i=2,e=t.length;e>i;i+=2)a.lineTo(t[i],t[i+1])}
