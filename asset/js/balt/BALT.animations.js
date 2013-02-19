(function(n){n.BALT||(n.BALT={}),n.BALT.animation||(n.BALT.animation={}),n.BALT.animation.calculations=function(){var n=this
n.calcBgY=function(n,e,t,o,i){return n+"px "+-(e+t-o)*i+"px"},n.calcBgX=function(n,e,t,o,i){return-(e+t-o)*i+"px "+n+"px"},n.calcXY=function(n,e,t,o,i,r){return-(n+e-t)*o+"px "+-(n+e-i)*r+"px"},n.calcPos=function(n,e,t,o){return(n+e-t)*o+"px"},n.calcRot=function(n,e,t,o,i){return n+-((e+t-o)*i)},n.calcProgress=function(n,e){return(n-scrollTopTweened)/(n-e)},n.calcDegrees2Radians=function(n){return n*Math.PI/180}},n.BALT.animation.spinner=function(){n(window),root=this,started=!1,scrollTop=0,scrollTopTweened=0,progress=0,currentIndex=-1,raf=null,cancelAnimation=!1,settings=null,root.scroll=function(n){scrollTop=n,n>=settings.startAt&&settings.endAt>=n?(cancelAnimation=!1,raf=requestAnimationFrame(e)):(cancelAnimation||cancelAnimationFrame(raf),cancelAnimation=!0)}
var e=function(){if(cancelAnimation||requestAnimationFrame(e),scrollTopTweened+=settings.tweenSpeed*(scrollTop-scrollTopTweened),progress=calculations.calcProgress(settings.startAt,settings.endAt),1>=progress){var n=settings.imageCount/settings.skipImages*settings.frameSpeed,t=Math.floor(progress*n)%settings.imageCount
settings.sequence.showImageAt(t)}}
root.init=function(e){var t={tickSpeed:30,useRAF:!0,tweenSpeed:.3}
settings=n.extend(t,e)
for(var o=0,i=["ms","moz","webkit","o"],r=0;i.length>r&&!window.requestAnimationFrame;++r)window.requestAnimationFrame=window[i[r]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[r]+"CancelAnimationFrame"]||window[i[r]+"CancelRequestAnimationFrame"]
return window.requestAnimationFrame||(window.requestAnimationFrame=function(n){var e=(new Date).getTime(),t=Math.max(0,16-(e-o)),i=window.setTimeout(function(){n(e+t)},t)
return o=e+t,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(n){clearTimeout(n)}),this}},n.BALT.animation.scroller=function(e){var t,o=this,i=0,r=n(window),a=n(document),s=n("#scrubber"),c=n("#scroller"),l=n("#main"),u=0,m={scrollSpeed:40},f=n.extend(m,e)
console.log("settings : ",f)
var g=function(){for(var n=f.register.length;n--;)w(i),f.register[n].scroll(i)},w=function(n){var e=n/f.maxScroll*(t-122)
l.css({transition:"all 0ms",transform:"translate( 0px, "+-1*n+"px)"}),s.css({transform:"translateY("+e+"px)"})},p=function(n,e){n.preventDefault(),i-=e*f.scrollSpeed,0>i&&(i=0),x(),g()},d=function(n){u=n.pageY,c.on("mousemove",T)},A=function(){c.off("mousemove",T)},T=function(n){var e=n.pageY-u
i+=e,console.log(n.pageY,u,e),g()},x=function(){0>i?i=0:i>f.maxScroll&&(i=f.maxScroll)}
o.scrollTo=function(n){i=n,g()},o.init=function(){a.on("mousewheel",p),r.on("resize",h),c.on("mousedown",d),r.on("mouseup",A),h(),scrollTo(f.startAt)}
var h=function(){t=r.height(),c.height(t-4)}}})(jQuery)
