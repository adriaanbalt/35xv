(function(o){o.BALT||(o.BALT={}),o.BALT.nav=function(n,t){var c=n,r={}
o.extend(r,t)
var l=function(){o.history.init(i),c.on("click","a",e)},e=function(n){console.log("navigate",o(n.currentTarget).attr("href").split("#")[1])},i=function(o){console.log("hash: ",o,scroller,gotoSection[o]),void 0!==gotoSection[o]?scroller.scrollTo(gotoSection[o]):scroller.scrollTo(0)}
l()}})(jQuery)
