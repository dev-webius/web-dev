// SwipeComponent.min.js
!function(){function e(e){function t(e){var t,o;if(e.constructor===MouseEvent)t=e.x,o=e.y;else{var n=e.touches[0];t=n.clientX,o=n.clientY,v.touchId=n.identifier}v.swipe=performance.now(),v.posX=t,v.posY=o,v.moveX=0,v.moveY=0,v.distance=0,v.duration=0,v.direction="",s("start")}function o(e){if(void 0!==v.swipe){var t,o;if(e.constructor===MouseEvent)t=e.x,o=e.y;else{var n=d(e.touches);t=n.clientX,o=n.clientY;var i=c.getBoundingClientRect();(n.pageX<i.left||n.pageX>i.right||n.pageY<i.top||n.pageY>i.bottom||n.clientX<0||n.clientX>window.innerWidth||n.clientY<0||n.clientY>window.innerHeight)&&(v.over=!0)}v.moveX=t-v.posX,v.moveY=o-v.posY,v.distance=Math.max(Math.abs(v.moveX),Math.abs(v.moveY)),v.duration=performance.now()-v.swipe,v.direction="",v.moveX>0&&(v.direction+="right"),v.moveX<0&&(v.direction+="left"),v.moveY>0&&(v.direction+=(""!==v.direction?" ":"")+"bottom"),v.moveY<0&&(v.direction+=(""!==v.direction?" ":"")+"top"),s("move"),v.over&&r()}}function n(e){if(void 0!==v.swipe){if(e.constructor!==MouseEvent&&null!==d(e.touches))return;v.duration=performance.now()-v.swipe,r()}}function i(e){e.preventDefault()}function r(){s(v.distance>=e.threshold?"end":"cancel"),v={}}function s(t){e.event(t,v.direction,v.distance,v.duration,{x:v.moveX,y:v.moveY},{x:v.posX,y:v.posY})}function d(e){if(void 0===v.touchId)return null;for(var t=0;t<e.length;t++)if(e[t].identifier===v.touchId)return e[t];return null}this.enable=function(){c.addEventListener(this.EVENT_START,t),c.addEventListener(this.EVENT_MOVE,o),c.addEventListener(this.EVENT_END,n),c.addEventListener(this.EVENT_OUT,n),c.addEventListener(this.EVENT_DRAGSTART,i),c.addEventListener(this.EVENT_SELECTSTART,i),window.addEventListener(this.EVENT_OUT,n)},this.disable=function(){c.removeEventListener(this.EVENT_START,t),c.removeEventListener(this.EVENT_MOVE,o),c.removeEventListener(this.EVENT_END,n),c.removeEventListener(this.EVENT_OUT,n),c.removeEventListener(this.EVENT_DRAGSTART,i),c.removeEventListener(this.EVENT_SELECTSTART,i),window.removeEventListener(this.EVENT_OUT,n)},e.event=e.event.bind(e.target),e.threshold=e.threshold||75;var c=e.target,v={};return this.enable(),this}HTMLElement.prototype.swipe=function(t){var o=this.swipeComponent;if(void 0===o){if(void 0===t)return void console.error("SwipeComponent :: properties required.");if(void 0===t.event)return void console.error("SwipeComponent :: event property required.");if("function"!=typeof t.event)return void console.error("SwipeComponent :: event property must be function.");t.target=this,this.swipeComponent=new e(t)}else{if("string"!=typeof t)return void console.error("SwipeComponent :: input swipe action command.");switch(t){case"enable":o.enable();break;case"disable":o.disable();break;case"destroy":o.disable(),delete this.swipeComponent;break;default:console.error("SwipeComponent :: swipe command '"+t+"' not found.")}}},e.prototype.toString=function(){return"SwipeComponent"},e.prototype.EVENT_START=void 0!==window.ontouchstart?"touchstart":"mousedown",e.prototype.EVENT_MOVE=void 0!==window.ontouchmove?"touchmove":"mousemove",e.prototype.EVENT_END=void 0!==window.ontouchend?"touchend":"mouseup",e.prototype.EVENT_DRAGSTART="dragstart",e.prototype.EVENT_SELECTSTART="selectstart",e.prototype.EVENT_OUT="mouseleave"}();

var wrap = document.querySelector('.wrap');

wrap.swipe({
    event: function(phase, direction, distance, duration, move, position) {
        if (phase === 'end') {
            console.log(phase, direction, distance, duration, move, position);
        }
    }
});