(function(t){t.BALT||(t.BALT={}),t.BALT.galleryScroll=function(i,e){var s,n,g,r,o,a,d=this,l=i,h=l.find(".gallery-container"),c=0,f=0
d.settings={loader:!1,ratioResize:!0,animating:!1,itemWidth:h.width(),itemHeight:0,totalImagesWidth:0,slideCount:h.find(".slide").length,loadCounter:0,direction:1,ratio:0,startAt:0,endAt:0},d.settings=t.extend(d.settings,e),d.init=function(){if(d.settings.onProgress){var i=l.find(".slide img")
i.each(function(){(t(this)[0].complete||4==t(this)[0].readyState)&&m(),t(this).load(m)})}d.settings.ratio=h.find(".slide:eq(0)").height()/h.find(".slide:eq(0)").width()}
var m=function(){d.settings.onProgress&&"function"==typeof d.settings.onProgress&&d.settings.onProgress()}
d.start=function(){t(window).resize(u),u()}
var u=function(){d.settings.itemWidth=h.find(".slide:eq(0)").width(),d.settings.itemHeight=h.find(".slide:eq(0)").height(),d.settings.totalImagesWidth=d.settings.slideCount*(d.settings.itemWidth+A(h.find(".slide:eq(0)"),"margin-right")),h.width(d.settings.totalImagesWidth),l.height(d.settings.totalImagesWidth-d.settings.itemWidth),d.settings.endAt=d.settings.startAt+l.height()},A=function(t,i){return parseInt(t.css(i).replace("px",""))}
d.scroll=function(t){console.log(""),console.log("$container ",h.selector),console.log("scroll: ",t,d.settings.startAt,d.settings.endAt),d.settings.endAt>t&&t>d.settings.startAt?(s=d.settings.totalImagesWidth,n=l.height(),g=t-d.settings.startAt,r=d.settings.endAt-d.settings.startAt,o=-1*W(c,s,g,r),a=W(f,n,g,r),d.settings.itemWidth-s>o&&(o=d.settings.itemWidth-s),a>n-d.settings.itemHeight&&(a=n-d.settings.itemHeight)):d.settings.startAt>t?(o=0,a=0):t>d.settings.endAt&&(o=d.settings.itemWidth-s,a=d.settings.itemWidth-n)
var i={transform:"translate("+o+"px,"+a+"px)"}
h.css(i)}
var W=function(t,i,e,s,n){var g=i-t,r=e/s
return n||(n=TWEEN.Easing.Linear.EaseNone),n(r)*g+t},A=function(t,i){return parseInt(t.css(i).replace("px",""))}
d.init()}})(jQuery)
