!function(){function e(e){function t(e){var t,o;if(e.constructor===MouseEvent)t=e.x,o=e.y;else{var n=e.touches[0];t=n.clientX,o=n.clientY,d.touchId=n.identifier}d.swipe=performance.now(),d.posX=t,d.posY=o,d.moveX=0,d.moveY=0,d.distance=0,d.duration=0,d.direction="",s("start")}function o(t){if(void 0!==d.swipe){var o,n,i,v;if(t.constructor===MouseEvent)o=t.x,n=t.y;else{var E=a(t.touches);o=E.clientX,n=E.clientY;var p=c.getBoundingClientRect();(E.pageX<p.left||E.pageX>p.right||E.pageY<p.top||E.pageY>p.bottom||E.clientX<0||E.clientX>window.innerWidth||E.clientY<0||E.clientY>window.innerHeight)&&(d.over=!0)}i=d.moveX,v=d.moveY,d.moveX=o-d.posX,d.moveY=n-d.posY,d.lastX=Math.abs(d.moveX-i),d.lastY=Math.abs(d.moveY-v),d.distance=Math.max(Math.abs(d.moveX),Math.abs(d.moveY)),d.duration=performance.now()-d.swipe,d.direction="",d.moveX>0&&(d.direction+="right"),d.moveX<0&&(d.direction+="left"),d.moveY>0&&(d.direction+=(""!==d.direction?" ":"")+"bottom"),d.moveY<0&&(d.direction+=(""!==d.direction?" ":"")+"top"),s("move"),d.over&&r(),t.cancelable&&("both"===e.direction&&t.preventDefault(),"horizontal"===e.direction&&d.lastY-d.lastX<=e.cancelRange&&t.preventDefault(),"vertical"===e.direction&&d.lastX-d.lastY<=e.cancelRange&&t.preventDefault())}}function n(e){if(void 0!==d.swipe){if(e.constructor!==MouseEvent&&null!==a(e.touches))return;d.duration=performance.now()-d.swipe,r()}}function i(e){e.preventDefault()}function r(){s(d.distance>=e.threshold?"end":"cancel"),d={}}function s(t){e.event(t,d.direction,d.distance,d.duration,{x:d.moveX,y:d.moveY},{x:d.posX,y:d.posY})}function a(e){if(void 0===d.touchId)return null;for(var t=0;t<e.length;t++)if(e[t].identifier===d.touchId)return e[t];return null}this.enable=function(){c.addEventListener(this.EVENT_START,t),c.addEventListener(this.EVENT_MOVE,o),c.addEventListener(this.EVENT_END,n),c.addEventListener(this.EVENT_OUT,n),c.addEventListener(this.EVENT_DRAGSTART,i),c.addEventListener(this.EVENT_SELECTSTART,i),window.addEventListener(this.EVENT_OUT,n)},this.disable=function(){c.removeEventListener(this.EVENT_START,t),c.removeEventListener(this.EVENT_MOVE,o),c.removeEventListener(this.EVENT_END,n),c.removeEventListener(this.EVENT_OUT,n),c.removeEventListener(this.EVENT_DRAGSTART,i),c.removeEventListener(this.EVENT_SELECTSTART,i),window.removeEventListener(this.EVENT_OUT,n)},e.event=e.event.bind(e.target),e.direction=e.direction||this.DEFAULT_DIRECTION,e.threshold=e.threshold||this.THRESHOLD,e.cancelRange=this.CANCEL_RANGE;var c=e.target,d={};return this.enable(),this}HTMLElement.prototype.swipe=function(t){var o=this.swipeComponent;if(void 0===o){if(void 0===t)return void console.error("SwipeComponent :: properties required.");if(void 0===t.event)return void console.error("SwipeComponent :: event property required.");if("function"!=typeof t.event)return void console.error("SwipeComponent :: event property must be function.");t.target=this,this.swipeComponent=new e(t)}else{if("string"!=typeof t)return void console.error("SwipeComponent :: input swipe action command.");switch(t){case"enable":o.enable();break;case"disable":o.disable();break;case"destroy":o.disable(),delete this.swipeComponent;break;default:console.error("SwipeComponent :: swipe command '"+t+"' not found.")}}},e.prototype.toString=function(){return"SwipeComponent"},e.prototype.EVENT_START=void 0!==window.ontouchstart?"touchstart":"mousedown",e.prototype.EVENT_MOVE=void 0!==window.ontouchmove?"touchmove":"mousemove",e.prototype.EVENT_END=void 0!==window.ontouchend?"touchend":"mouseup",e.prototype.EVENT_DRAGSTART="dragstart",e.prototype.EVENT_SELECTSTART="selectstart",e.prototype.EVENT_OUT="mouseleave",e.prototype.DEFAULT_DIRECTION="horizontal",e.prototype.THRESHOLD=75,e.prototype.CANCEL_RANGE=2}();

/**
 * SlideComponent
 */
!function() {
    HTMLElement.prototype.slide = function(props) {
        var component = this.slideComponent;

        if (component === void 0) {
            if (props === void 0) {
                console.error('SlideComponent :: properties required.');
                return;
            }
            if (props.event === void 0) {
                console.error('SlideComponent :: event property required.');
                return;
            }
            if (typeof props.event !== 'function') {
                console.error('SlideComponent :: event property must be function.');
                return;
            }

            props.target = this;
            this.slideComponent = new SlideComponent(props);
        } else {
            if (typeof props === 'number') {
                component.slide(props);
            } else if (typeof props === 'string') {
                switch(props) {
                    case 'destroy':
                        component.destroy();
                        delete this.slideComponent;
                        break;
                    default:
                        console.error('SlideComponent :: slide command \'' + props + '\' not found.');
                }
            } else {
                console.error('SlideComponent :: input slide index or action command.');
                return;
            }
        }
    }

    function SlideComponent(props) {
        // functions

        // methods
        this.destroy = function() {
            target.innerHTML = '';
            children.forEach(function(element) {
                target.appendChild(element);
            });
        }

        // default

        // definition
        var target = props.target;
        var data = {};
        var children = [];

        // init
        for (var i = 0; i < target.children.length; i++) {
            children.push(target.children[i].cloneNode(true));
        }
        target.appendChild(document.createElement('div'));

        return this;
    }

    SlideComponent.prototype.toString = function() {
        return 'SlideComponent';
    }
}();

var wrap = document.querySelector('.wrap');
var slider = document.querySelector('#slider');

[].slice.call(slider.querySelectorAll('li')).forEach(function(list, i) {
    list.addEventListener('click', function() {
        console.log(i + ' clicked');
    });
});
slider.slide({
    event: function() {
        console.log('slide event');
    }
});

