var ImageSequence=function(e){var a,o,n,s={skipImages:1,recheckDelay:500,loadInterval:100,frameSpeed:1},r=[],t=-1,i=0,m=$.extend(s,e),l=function(){return 0==i&&u(0),m.onProgress&&"function"==typeof m.onProgress&&m.onProgress(),i==m.imageCount?(m.onComplete&&"function"==typeof m.onComplete&&m.onComplete(),!1):(a?(clearTimeout(a),a=null):a=setTimeout(l,m.loadInterval),i+=m.skipImages,void 0)},u=function(e){if(e==t)return!1
var a=r[e]
clearTimeout(n),a?(c(t),t=e,$(a).removeClass("hidden").addClass("show")):(clearTimeout(o),o=setTimeout(u,m.recheckDelay,e))},c=function(e){var a=r[e]
a&&$(a).removeClass("show").addClass("hidden")},d=function(){for(var e=0;m.imageCount>=e;e+=m.skipImages){var a=new Image
a.src=m.filesPath.replace("{index}",e),a.className="slide",m.container.append(a),r.push(a),a.complete?l():a.onload=l}}
return{load:d,showImageAt:u,imageCount:m.imageCount,skipImages:m.skipImages,frameSpeed:m.frameSpeed}}
