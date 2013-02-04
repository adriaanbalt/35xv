var ImageSequence=function(e){var n,o,a,t={skipImages:1,recheckDelay:500,loadInterval:100},r=-1,i=0,c=$.extend(t,e),s=function(){return 0==i&&m(0),c.onProgress&&"function"==typeof c.onProgress&&c.onProgress(),i==c.imageCount?(c.onComplete&&"function"==typeof c.onComplete&&c.onComplete(),!1):(n?(clearTimeout(n),n=null):n=setTimeout(s,c.loadInterval),i+=c.skipImages,void 0)},l=function(e){c.container.children()[e]},m=function(e){if(e==r)return!1
var n=c.container.children()[e]
clearTimeout(a),n?(l(r),r=e):(clearTimeout(o),o=setTimeout(m,c.recheckDelay,e))},u=function(){for(var e=0;c.imageCount>=e;e+=c.skipImages){var n=new Image
n.src=c.filesPath.replace("{index}",e),n.className="slide",c.container.append(n),n.complete?s():n.onload=s}}
return{load:u,showImageAt:m,imageCount:c.imageCount,skipImages:c.skipImages}}
