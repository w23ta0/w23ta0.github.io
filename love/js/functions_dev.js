var gardenCtx,gardenCanvas,$garden,garden,$window=$(window),clientWidth=$(window).width(),clientHeight=$(window).height();function getHeartPoint(t){var e=t/Math.PI,n=16*Math.pow(Math.sin(e),3)*19.5,s=-20*(13*Math.cos(e)-5*Math.cos(2*e)-2*Math.cos(3*e)-Math.cos(4*e));return new Array(offsetX+n,offsetY+s)}function startHeartAnimation(){var a=10,o=new Array,i=setInterval(function(){for(var t=getHeartPoint(a),e=!0,n=0;n<o.length;n++){var s=o[n];if(Math.sqrt(Math.pow(s[0]-t[0],2)+Math.pow(s[1]-t[1],2))<1.3*Garden.options.bloomRadius.max){e=!1;break}}e&&o.push(t),30<=a?(clearInterval(i),showMessages()):a+=.2},50)}function getDaysInMonth(t){return[31,28,31,30,31,30,31,31,30,31,30,31][t]}function timeElapse(t,e){var n=new Date,s=NaN,a=NaN,o=NaN,i=NaN,r=NaN,h=NaN;(h=n.getSeconds()-t.getSeconds())<0&&(h+=60,n.setMinutes(n.getMinutes()-1)),(r=n.getMinutes()-t.getMinutes())<0&&(r+=60,n.setHours(n.getHours()-1)),(i=n.getHours()-t.getHours())<0&&(i+=24,n.setDate(n.getDate()-1)),1==e?((o=n.getDate()-t.getDate())<0&&(o+=getDaysInMonth(n.getMonth()),n.setDate(n.getDate()-1)),(a=n.getMonth()-t.getMonth())<0&&(a+=12,n.setYear(n.getFullYear()-1)),s=n.getFullYear()-t.getFullYear()):o=Math.floor((n.getTime()-t.getTime())/864e5),i<10&&(i="0"+i),r<10&&(r="0"+r),h<10&&(h="0"+h);var g=0<s?'<span class="digit"><h3>'+s+"</h3> years </span>":"";g+=0<=a?'<span class="digit"><h3>'+a+"</h3> months </span>":"",g+='<span class="digit"><h3>'+o+"</h3> days </span>",g+='<span class="digit"><h3>'+i+"</h3> hours </span>",g+='<span class="digit"><h3>'+r+"</h3> minutes </span>",g+='<span class="digit"><h3>'+h+"</h3> seconds</span>",$("#elapseClock").html(g)}function showMessages(){adjustWordsPosition(),$("#messages").fadeIn(5e3,function(){showLoveU()})}function adjustWordsPosition(){$("#words").css("position","absolute")}function adjustCodePosition(){$("#code").css("margin-top",($("#garden").height()-$("#code").height())/2)}function showLoveU(){$("#loveu").fadeIn(3e3)}$(window).resize(function(){var t=$(window).width(),e=$(window).height();t!=clientWidth&&e!=clientHeight&&location.replace(location)}),function(a){a.fn.typewriter=function(){return this.each(function(){var t=a(this),e=t.html(),n=0;t.html("");var s=setInterval(function(){"<"==e.substr(n,1)?n=e.indexOf(">",n)+1:n++,t.html(e.substring(0,n)+(1&n?"_":"")),n>=e.length&&clearInterval(s)},75)}),this}}(jQuery);