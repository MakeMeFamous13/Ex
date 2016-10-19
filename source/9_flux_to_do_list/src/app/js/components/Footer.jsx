var React = require('react');
var TodoActions = require('../actions/ToDoActions');
var ReactPropTypes = React.PropTypes;

var Footer = React.createClass({
    propTypes: {
        allTodos: ReactPropTypes.object.isRequired
    },
    render: function(){
        var allTodos = this.props.allTodos;
        var total = 0;
        var completed = 0;

        for(var i in allTodos){
            if(allTodos[i].complete){
                completed ++;
            }

            total ++;
        }

        var itemsLeft = total - completed;
        var itemLeftPhase = itemsLeft === 1 ? ' item ' : ' items ';
        itemLeftPhase += 'left';

        var clearTodoBtn;
        if(completed){
            clearTodoBtn =
                <button id="clear-completed"
                onClick={this._onClearCompletedClick}
                >
                Clear Completed ({completed})
                </button>
        }
        return(
            <footer id="footer">
                <span id="todo-count">
                    <strong>{itemsLeft}</strong>
                    {itemLeftPhase}
                </span>
                {clearTodoBtn}
            </footer>
        );
    },
    _onClearCompletedClick: function(){
        TodoActions.removeCompleted();
    }
});

module.exports = Footer;