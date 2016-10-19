var React = require('react');
var ClassNameHelper = require('./ClassNameHelper');

var CustomButton = React.createClass({
    mixins: [ClassNameHelper],
    getDefaultProps: function(){
        return {bsClass: 'btn'};
    },
    render: function(){
        return (
            this.transferPropsTo(
                <button className={this.extendClassName()}>
                    {this.props.children}
                </button>
            )
        );
    }
});

module.exports = CustomButton;