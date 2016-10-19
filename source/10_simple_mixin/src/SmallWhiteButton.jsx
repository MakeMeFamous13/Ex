var React = require('react');
var Large = require('./styleMixins/Large');
var Primary = require('./styleMixins/Primary');
var ClassHelper = require('./ClassNameHelper');

var MediumDangerButton = React.createClass({
    mixins: [ClassHelper, Large, Primary],
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