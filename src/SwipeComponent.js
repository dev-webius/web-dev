/**
 * SwipeComponent
 * @param {Object} props - 필수, SwipeComponent 오브젝트를 생성하기 위한 필수 파라미터
 * @param {Function} props.event - 필수, 이벤트 콜백 함수
 * @param {Number} props.threshold - 선택, 스와이프 판단 범위 (기본값: 75)
 * @param {Element} props.target - 자동, 컴포넌트를 생성한 요소
 * 
 * HTMLElement.swipe
 * @param {Object, String} props - 필수, SwipeComponent 최초 성생 시 Object, 액션 커맨드 전달 시 String 자료형으로 전달
 * 
 * Swipe Action Command
 * enable - 스와이프 활성화
 * disable - 스와이프 비활성화
 * destroy - 스와이프 완전 해제
 */
 !function() {
    HTMLElement.prototype.swipe = function(props) {
        var component = this.swipeComponent;

        if (component === void 0) {
            if (props === void 0) {
                console.error('SwipeComponent :: properties required.');
                return;
            }
            if (props.event === void 0) {
                console.error('SwipeComponent :: event property required.');
                return;
            }
            if (typeof props.event !== 'function') {
                console.error('SwipeComponent :: event property must be function.');
                return;
            }
            
            props.target = this;
            this.swipeComponent = new SwipeComponent(props);
        } else {
            if (typeof props === 'string') {
                switch(props) {
                    case 'enable':
                        component.enable();
                        break;
                    case 'disable':
                        component.disable();
                        break;
                    case 'destroy':
                        component.disable();
                        delete this.swipeComponent;
                        break;
                    default:
                        console.error('SwipeComponent :: swipe command \'' + props + '\' not found.');
                }
            } else {
                console.error('SwipeComponent :: input swipe action command.');
                return;
            }
        }
    }
    
    function SwipeComponent(props) {
        // functions
        function startEvent(event) {
            var posX, posY;

            if (event.constructor === MouseEvent) {
                posX = event.x;
                posY = event.y;
            } else {
                var touch = event.touches[0];

                posX = touch.clientX;
                posY = touch.clientY;
                
                data.touchId = touch.identifier;
            }

            data.swipe = performance.now();
            data.posX = posX;
            data.posY = posY;

            data.moveX = 0;
            data.moveY = 0;

            data.distance = 0;
            data.duration = 0;
            data.direction = '';

            sendEvent('start');
        }
        function moveEvent(event) {
            if (data.swipe !== void 0) {
                var posX, posY;

                if (event.constructor === MouseEvent) {
                    posX = event.x;
                    posY = event.y;
                } else {
                    var touch = getTouch(event.touches);

                    posX = touch.clientX;
                    posY = touch.clientY;
                    
                    var rect = target.getBoundingClientRect();

                    // check touch out element / window
                    if (touch.pageX < rect.left ||
                        touch.pageX > rect.right ||
                        touch.pageY < rect.top ||
                        touch.pageY > rect.bottom ||
                        touch.clientX < 0 ||
                        touch.clientX > window.innerWidth ||
                        touch.clientY < 0 ||
                        touch.clientY > window.innerHeight) {
                        data.over = true;
                    }
                }

                data.moveX = posX - data.posX;
                data.moveY = posY - data.posY;
    
                data.distance = Math.max(Math.abs(data.moveX), Math.abs(data.moveY));
                data.duration = performance.now() - data.swipe;
                data.direction = '';
                if (data.moveX > 0) {
                    data.direction += 'right';
                }
                if (data.moveX < 0) {
                    data.direction += 'left';
                }
                if (data.moveY > 0) {
                    data.direction += (data.direction !== '' ? ' ' : '') + 'bottom';
                }
                if (data.moveY < 0) {
                    data.direction += (data.direction !== '' ? ' ' : '') + 'top';
                }
    
                sendEvent('move');

                if (data.over) {
                    endSwipe();
                }
            }
        }
        function endEvent(event) {
            if (data.swipe !== void 0) {
                if (event.constructor !== MouseEvent) {
                    if (getTouch(event.touches) !== null) {
                        return;
                    }
                }

                data.duration = performance.now() - data.swipe;
    
                endSwipe();
            }
        }
        function preventEvent(event) {
            event.preventDefault();
        }
        function endSwipe() {
            sendEvent(data.distance >= props.threshold ? 'end' : 'cancel');
            
            data = {};
        }
        function sendEvent(phase) {
            props.event(
                phase,
                data.direction,
                data.distance,
                data.duration,
                {x: data.moveX, y: data.moveY},
                {x: data.posX, y: data.posY}
            );
        }
        function getTouch(touchList) {
            if (data.touchId === void 0) {
                return null;
            }

            for (var i = 0; i < touchList.length; i++) {
                if (touchList[i].identifier === data.touchId) {
                    return touchList[i];
                }
            }

            return null;
        }

        // methods
        this.enable = function() {
            target.addEventListener(this.EVENT_START, startEvent);
            target.addEventListener(this.EVENT_MOVE, moveEvent);
            target.addEventListener(this.EVENT_END, endEvent);
            target.addEventListener(this.EVENT_OUT, endEvent);
            target.addEventListener(this.EVENT_DRAGSTART, preventEvent);
            target.addEventListener(this.EVENT_SELECTSTART, preventEvent);
            
            window.addEventListener(this.EVENT_OUT, endEvent);
        }

        this.disable = function() {
            target.removeEventListener(this.EVENT_START, startEvent);
            target.removeEventListener(this.EVENT_MOVE, moveEvent);
            target.removeEventListener(this.EVENT_END, endEvent);
            target.removeEventListener(this.EVENT_OUT, endEvent);
            target.removeEventListener(this.EVENT_DRAGSTART, preventEvent);
            target.removeEventListener(this.EVENT_SELECTSTART, preventEvent);
            
            window.removeEventListener(this.EVENT_OUT, endEvent);
        }

        // default
        props.event = props.event.bind(props.target);
        props.threshold = props.threshold || 75;

        // definition
        var target = props.target;
        var data = {};

        // init
        this.enable();

        return this;
    }

    SwipeComponent.prototype.toString = function() {
        return 'SwipeComponent';
    }

    SwipeComponent.prototype.EVENT_START = typeof window.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown';
    SwipeComponent.prototype.EVENT_MOVE = typeof window.ontouchmove !== 'undefined' ? 'touchmove' : 'mousemove';
    SwipeComponent.prototype.EVENT_END = typeof window.ontouchend !== 'undefined' ? 'touchend' : 'mouseup';
    SwipeComponent.prototype.EVENT_DRAGSTART = 'dragstart';
    SwipeComponent.prototype.EVENT_SELECTSTART = 'selectstart';
    SwipeComponent.prototype.EVENT_OUT = 'mouseleave';
}();