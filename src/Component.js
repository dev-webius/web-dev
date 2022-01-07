/**
 * Component
 */
!function() {
    HTMLElement.prototype.slide = function(props) {
        var component = this.component;

        if (component === void 0) {
            if (props === void 0) {
                console.error('Component :: properties required.');
                return;
            }
            if (props.event === void 0) {
                console.error('Component :: event property required.');
                return;
            }
            if (typeof props.event !== 'function') {
                console.error('Component :: event property must be function.');
                return;
            }

            props.target = this;
            this.component = new Component(props);
        } else {
            if (typeof props === 'number') {
                component.slide(props);
            } else if (typeof props === 'string') {
                switch(props) {
                    case 'destroy':
                        delete this.component;
                        break;
                    default:
                        console.error('Component :: slide command \'' + props + '\' not found.');
                }
            } else {
                console.error('Component :: input slide index or action command.');
                return;
            }
        }
    }

    function Component(props) {
        // functions

        // methods

        // default

        // definition
        var target = props.target;
        var data = {};

        // init

        return this;
    }

    Component.prototype.toString = function() {
        return 'Component';
    }
}();