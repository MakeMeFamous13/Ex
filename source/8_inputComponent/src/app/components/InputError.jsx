var React = require('react/addons');
var _ = require('underscore');

var cx = React.addons.classSet;

var InputError = React.createClass({
    getInitialState: function(){
        return {
            message: "Input is Invalid!"
        };
    },
    render: function(){
        var errorClass = {
            visible: this.props.visible,
            error_container: true
        };
        return (
            <div className={errorClass}>
                <span>{this.props.errorMessage}</span>
            </div>
        );
    }
});

module.exports = InputError;