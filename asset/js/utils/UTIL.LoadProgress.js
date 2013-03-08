var LoadProgress=function(n){var o={},t=$.extend(o,n),e=0,p=0,f=!1,a=function(n){e+=n},r=function(n){p+=n=1,p==e&&f===!1&&0!=p?("function"==typeof t.onUpdate&&t.onUpdate(p/e),"function"==typeof t.onComplete&&t.onComplete(),f=!0):"function"==typeof t.onUpdate&&t.onUpdate(p/e)}
return{register:a,update:r}}
