var TextSlant=function(e,t,n,o,i){for(var r="",a=o-n,l=0;a>0;)r+='<div style="float:left;clear:left;height:'+t+";width:"+l+'px"></div>',r+='<div style="float:right;clear:right;height:'+t+";width:"+a+'px"></div>',l+=i,a-=i
e.prepend(r)},DrawShape=function(e,t,n,o,i,r){t=void 0==t?"#fff":t,r=void 0==r?100:r
var a=document.getElementById(e).getContext("2d")
a.fillStyle=t,a.beginPath(),a.moveTo(0,0),"trapezoid"==i?(n-=r,a.lineTo(n,0),a.lineTo(n+r,o),a.lineTo(r,o)):"parallelogram"==i&&(a.lineTo(n,0),a.lineTo(n,o),a.lineTo(r,o)),a.closePath(),a.fill()},hexToRgb=function(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i
e=e.replace(t,function(e,t,n,o){return t+t+n+n+o+o})
var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)
return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null},componentToHex=function(e){var t=e.toString(16)
return 1==t.length?"0"+t:t},rgbToHex=function(e,t,n){return"#"+componentToHex(e)+componentToHex(t)+componentToHex(n)}
