var LoadProgress=function(n){var e={},o=$.extend(e,n),t=0,r=0,f=!1,p=function(n){t+=n},u=function(n){r+=n=1,r==t&&f===!1&&("function"==typeof o.onUpdate&&o.onUpdate(r/t),"function"==typeof o.onComplete&&o.onComplete(),f=!0)}
return{register:p,update:u}}
