(function(t){t.BALT||(t.BALT={}),t.BALT.loader=function(n,i){var e=this,o=n,s={}
settings=t.extend(s,i),e.update=function(t){o.find(".bar").css({width:t+"%",transition:"width .2s"}),100==t&&a()}
var a=function(){var t={opacity:0,filter:"alpha(opacity=0)",transition:"all 1s"}
o.css(t),settings.onComplete&&"function"==typeof settings.onComplete&&window.setTimeout(settings.onComplete,1e3)}}})(jQuery)
