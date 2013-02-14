(function(e){e.BALT||(e.BALT={}),e.BALT.imageSequence=function(o){var a,n,s,r={skipImages:1,recheckDelay:500,loadInterval:100,frameSpeed:1},t=[],i=-1,m=0,l=e.extend(r,o),u=function(){return 0==m&&c(0),l.onProgress&&"function"==typeof l.onProgress&&l.onProgress(),m==l.imageCount?(l.onComplete&&"function"==typeof l.onComplete&&l.onComplete(),!1):(a?(clearTimeout(a),a=null):a=setTimeout(u,l.loadInterval),m+=l.skipImages,void 0)},c=function(o){if(o==i)return!1
var a=t[o]
clearTimeout(s),a?(d(i),i=o,e(a).removeClass("hidden").addClass("show")):(clearTimeout(n),n=setTimeout(c,l.recheckDelay,o))},d=function(o){var a=t[o]
a&&e(a).removeClass("show").addClass("hidden")},p=function(){for(var e=0;l.imageCount>=e;e+=l.skipImages){var o=new Image
o.src=l.filesPath.replace("{index}",e),o.className="slide",l.container.append(o),t.push(o),o.complete?u():o.onload=u}}
return{load:p,showImageAt:c,imageCount:l.imageCount,skipImages:l.skipImages,frameSpeed:l.frameSpeed}}})(jQuery)
