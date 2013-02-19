(function(t){t.BALT||(t.BALT={}),t.BALT.galleryScroll=function(s,i){var e,n,a,r,g,o,d,h,l=this,m=s,f=m.find(".gallery-container"),c=0,u=0
l.settings={loader:!1,ratioResize:!0,animating:!1,itemWidth:f.width(),itemHeight:0,totalImagesWidth:0,slideCount:f.find(".slide").length,loadCounter:0,direction:1,ratio:0,startAt:0,endAt:0},l.settings=t.extend(l.settings,i),l.init=function(){if(l.settings.onProgress){var s=m.find(".slide img")
s.each(function(){(t(this)[0].complete||4==t(this)[0].readyState)&&A(),t(this).load(A)})}}
var A=function(){l.settings.onProgress&&"function"==typeof l.settings.onProgress&&l.settings.onProgress()}
l.start=function(){t(window).resize(p),p()}
var p=function(){l.settings.itemWidth=f.find(".slide:eq(0)").width(),l.settings.itemHeight=f.find(".slide:eq(0)").height(),l.settings.totalImagesWidth=l.settings.slideCount*(l.settings.itemWidth+130),f.width(l.settings.totalImagesWidth),m.height(l.settings.totalImagesWidth-l.settings.itemWidth),l.settings.endAt=l.settings.startAt+m.height()}
l.scroll=function(t){d=l.settings.itemWidth-e+130,h=n-l.settings.itemHeight,l.settings.endAt>t&&t>l.settings.startAt?(e=l.settings.totalImagesWidth,n=m.height(),a=t-l.settings.startAt,r=l.settings.endAt-l.settings.startAt,g=-1*x(c,e,a,r),o=x(u,n,a,r),d>g&&(g=d),o>h&&(o=h)):l.settings.startAt>t?(g=0,o=0):t>l.settings.endAt&&(g=d,o=h)
var s={transform:"translate("+g+"px,"+o+"px)","-ms-transform":"translate("+g+"px,"+o+"px)","-webkit-transform":"translate("+g+"px,"+o+"px)","-o-transform":"translate("+g+"px,"+o+"px)","-moz-transform":"translate("+g+"px,"+o+"px)"}
f.css(s)}
var x=function(t,s,i,e,n){var a=s-t,r=i/e
return n||(n=TWEEN.Easing.Linear.EaseNone),n(r)*a+t}
l.init()}})(jQuery)
