var React = require('react');
var ToDoTextInput = require('./TodoTextInput');
var TodoActions = require('../actions/ToDoActions');

var Header = React.createClass({
    render: function(){
        return(
            <header id="header">
                <h1>todos</h1>
                <ToDoTextInput
                    id="new-todo"
                    placeholder="What needs to be done?"
                    className="input"
                    onSave={this._onSave}
                />
            </header>
        );
    },
    _onSave: function(text){
        if(text.trim()){
            TodoActions.create(text);
        }
    }
});

module.exports = Header;