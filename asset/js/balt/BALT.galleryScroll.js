(function(t){t.BALT||(t.BALT={}),t.BALT.galleryScroll=function(i,s){var n=this,e=i,a=e.find(".gallery-container")
n.settings={loader:!1,ratioResize:!0,animating:!1,itemWidth:a.width(),slideCount:a.find(".slide").length,loadCounter:0,direction:1,ratio:0,startAt:0,endAt:0},n.settings=t.extend(n.settings,s),n.init=function(){if(n.settings.onLoad){var i=e.find(".slide img")
i.each(function(){(t(this)[0].complete||4==t(this)[0].readyState)&&o(),t(this).load(o)})}n.settings.ratio=a.find(".slide:eq(0)").height()/a.find(".slide:eq(0)").width()}
var o=function(){n.settings.onLoad&&"function"==typeof n.settings.onLoad&&n.settings.onLoad()}
n.start=function(){t(window).resize(r),r()}
var r=function(){a.find(".slide").each(function(){}),n.settings.itemWidth=a.find(".slide:eq(0)").width(),totalImagesWidth=n.settings.slideCount*(n.settings.itemWidth+d(a.find(".slide:eq(0)"),"margin-right")),a.width(totalImagesWidth),e.height(totalImagesWidth-n.settings.itemWidth),n.settings.startAt=e.offset().top-100,n.settings.endAt=Math.round(n.settings.startAt+e.height())},d=function(t,i){return parseInt(t.css(i).replace("px",""))}
n.scroll=function(t){var i,s,o,r,d,l,h,f
n.settings.endAt>t&&t>n.settings.startAt?(i="string"==typeof a.css("left")?0:a.css("left"),s=totalImagesWidth,o="string"==typeof a.css("top")?0:a.css("top"),r=e.height(),d=t-n.settings.startAt,l=n.settings.endAt-n.settings.startAt,h=Math.round(-1*g(i,s,d,l)),f=Math.round(g(o,r,d,l))):n.settings.startAt>t?(h=0,f=0):t>n.settings.endAt&&(h=0,f=0)
var c={transform:"translate("+h+"px,"+f+"px)",transition:"all 0s ease"}
a.css(c)}
var g=function(t,i,s,n,e){var a=i-t,o=s/n
return e||(e=TWEEN.Easing.Linear.EaseNone),e(o)*a+t},d=function(t,i){return parseInt(t.css(i).replace("px",""))}
n.init()}})(jQuery)
