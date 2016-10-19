var React = require('react');
var Medium = require('./styleMixins/Medium');
var Danger = require('./styleMixins/Danger');
var ClassHelper = require('./ClassNameHelper');

var MediumDangerButton = React.createClass({
    mixins: [ClassHelper, Medium, Danger],
    getDefaultProps: function(){
        return {bsClass: 'btn'};
    },
    render: function(){
        return (
            <button className={this.extendClassName()}>
                {this.props.children}
            </button>
        );
    }
});

module.exports = MediumDangerButton;