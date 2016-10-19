var React = require('../../build/react-dom.min.js');

var ClassNameHelper = {
    extendClassName: function(){
        var bsClass = this.props.bsClass;
        var bsStyle = this.props.bsStyle;
        var bsSize = this.props.bsSize;
        var prefix = this.props.bsClass + '-';

        var classes = {}
        if(this.props.bsClass)
            classes[this.props.bsClass] = true;
        if(this.props.bsSize)
            classes[prefix + this.props.bsSize] = true;
        if(this.props.bsStyle)
            classes[prefix + this.props.bsStyle] = true;
        // Merge with previous classes
        if(this.props.className)
            this.props.className.split(' ').map(
                function(klass){
                    classes[klass] = true;
                }
            );

        return React.addons.classSet(classes);
    }
};

