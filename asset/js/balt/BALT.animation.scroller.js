(function(e){e.BALT||(e.BALT={}),e.BALT.animation||(e.BALT.animation={}),e.BALT.animation.calculations=function(){var e=this
e.calcBgY=function(e,t,n,i,s){return e+"px "+-(t+n-i)*s+"px"},e.calcBgX=function(e,t,n,i,s){return-(t+n-i)*s+"px "+e+"px"},e.calcXY=function(e,t,n,i,s,o){return-(e+t-n)*i+"px "+-(e+t-s)*o+"px"},e.calcPos=function(e,t,n,i){return(e+t-n)*i+"px"},e.calcRot=function(e,t,n,i,s){return e+-((t+n-i)*s)},e.calcProgress=function(e,t){return(e-scrollTopTweened)/(e-t)},e.calcDegrees2Radians=function(e){return e*Math.PI/180}},e.BALT.animation.scroller=function(t){var n=e(window)
root=this,started=!1,scrollTop=0,scrollTopTweened=0,progress=0,currentIndex=-1
var i={maxScroll:1e3,tickSpeed:30,useRAF:!0,scrollSpeed:20,tweenSpeed:.3,skipImages:1,frameSpeed:1}
settings=e.extend(i,t)
var s=function(){if(requestAnimFrame(s),scrollTopTweened+=settings.tweenSpeed*(n.scrollTop()-scrollTopTweened),progress=calculations.calcProgress(settings.startAt,settings.endAt),1>=progress){var e=settings.imageCount/settings.skipImages*settings.frameSpeed,t=Math.floor(progress*e)%settings.imageCount
o(t)}},o=function(e){if(e==currentIndex)return!1
var t=settings.images[e]
t&&(r(currentIndex),currentIndex=e,t.style.display="block")},r=function(e){var t=settings.images[e]
t&&(t.style.display="none")},a=function(){for(var t in animation){var n=animation[t]
void 0==n._elem&&(n._elem=e("#"+n.id))
for(var i in n.keyframes){var s=n.keyframes[i]
if(0==s.position){var o=n.keyframes[Number(i)+1]
for(c in o.properties)void 0==s.properties[c]&&/left|top/.test(c)&&(s.properties[c]=n._elem.position()[c])}for(var r=Number(i);r>0;){var a=n.keyframes[r]
for(var c in a.properties)void 0==s.properties[c]&&(s.properties[c]=a.properties[c])
r--}"function"==typeof s.onInit&&s.onInit(n)}}},c=function(){settings.onResize&&"function"==typeof settings.onResize&&settings.onResize(),settings.container,page={wWidth:settings.container.width(),wHeight:settings.container.height(),wCenter:{left:settings.container.width()/2,top:settings.container.height()/2}},a(),p()},p=function(){!started&&settings.startAt&&(scrollTopTweened=scrollTop=settings.startAt),scrollTop++,started||(s(),started=!0),settings.onStart&&"function"==typeof settings.onStart&&settings.onStart()}
root.init=function(t){var n={maxScroll:1e3,tickSpeed:30,scrollSpeed:20,useRAF:!0,tweenSpeed:.3,freezeTouchScroll:!1}
return settings=e.extend(n,t),animation=settings.animation,window.requestAnimFrame=function(){return settings.useRAF?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,settings.tickSpeed)}:function(e){window.setTimeout(e,settings.tickSpeed)}}(),c(),this}}})(jQuery)
