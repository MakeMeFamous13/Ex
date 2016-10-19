var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/ToDoActions');
var TodoItem = require('./TodoItem');

var MainSection = React.createClass({
    render: function(){
        if(Object.keys(this.props.allTodos).length < 1){
            return null;
        }
        var allTodos = this.props.allTodos;
        var todos = [];

        for(var i in allTodos){
            todos.push(<TodoItem key={i} todo={allTodos[i]} />);
        }

        return (
            <section id="main">
                <input
                    id="toggle-all"
                    type="checkbox"
                    onChange={this._onToggle}
                    checked={this.props.areAllComplete ? 'checked' : ''}
                />
                <label htmlFor="toggle-all">Mark all complete</label>
                <ul id="todo-list" className="todo-list">
                    {todos}
                </ul>
            </section>
        );
    },

    _onToggle: function(){
        TodoActions.toggleCompleteAll();
    }
});

module.exports = MainSection;