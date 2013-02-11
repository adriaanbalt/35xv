(function(n){n.BALT||(n.BALT={}),n.BALT.animation||(n.BALT.animation={}),n.BALT.animation.calculations=function(){var n=this
n.calcBgY=function(n,e,t,i,o){return n+"px "+-(e+t-i)*o+"px"},n.calcBgX=function(n,e,t,i,o){return-(e+t-i)*o+"px "+n+"px"},n.calcXY=function(n,e,t,i,o,r){return-(n+e-t)*i+"px "+-(n+e-o)*r+"px"},n.calcPos=function(n,e,t,i){return(n+e-t)*i+"px"},n.calcRot=function(n,e,t,i,o){return n+-((e+t-i)*o)},n.calcProgress=function(n,e){return(n-scrollTopTweened)/(n-e)},n.calcDegrees2Radians=function(n){return n*Math.PI/180}},n.BALT.animation.spinner=function(){var e=n(window)
root=this,started=!1,scrollTop=0,scrollTopTweened=0,progress=0,currentIndex=-1
var t=function(){if(requestAnimFrame(t),scrollTopTweened+=settings.tweenSpeed*(e.scrollTop()-scrollTopTweened),progress=calculations.calcProgress(settings.startAt,settings.endAt),1>=progress){var n=settings.imageCount/settings.skipImages*settings.frameSpeed,i=Math.floor(progress*n)%settings.imageCount
settings.sequence.showImageAt(i)}},i=function(){settings.onResize&&"function"==typeof settings.onResize&&settings.onResize()}
root.init=function(e){var o={tickSpeed:30,useRAF:!0,tweenSpeed:.3}
if(settings=n.extend(o,e),window.requestAnimationFrame)window.requestAnimFrame=function(){return settings.useRAF?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,settings.tickSpeed)}:function(n){window.setTimeout(n,settings.tickSpeed)}}()
else{for(var r=0,s=["ms","moz","webkit","o"],a=0;s.length>a&&!window.requestAnimationFrame;++a)window.requestAnimationFrame=window[s[a]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[s[a]+"CancelAnimationFrame"]||window[s[a]+"CancelRequestAnimationFrame"]
window.requestAnimationFrame||(window.requestAnimationFrame=function(n){var e=(new Date).getTime(),t=Math.max(0,16-(e-r)),i=window.setTimeout(function(){n(e+t)},t)
return r=e+t,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(n){clearTimeout(n)})}return i(),t(),this}},n.BALT.animation.scroller=function(n){registrations=n.register
var e=function(){for(var n=registrations.length;n--;)registrations[n].scroll($window.scrollTop())}
$window.bind("scroll",e)}})(jQuery)
