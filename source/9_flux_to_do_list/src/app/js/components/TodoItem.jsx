var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/ToDoActions');
var TodoTextInput = require('./TodoTextInput');

var classNames = require('classnames');


var TodoItem = React.createClass({
    propTypes: {
        todo: ReactPropTypes.object.isRequired
    },
    getInitialState: function(){
        return {
            isEditing: false
        };
    },
    render: function(){
        var todo = this.props.todo;
        var input;

        if(this.state.isEditing){
            input =
                <TodoTextInput
                    className="edit"
                    onSave={this._onSave}
                    value={todo.text}
                />
        }

        return (
            <li
                className={classNames({
                    'completed':todo.complete,
                    'editing':this.state.isEditing
                })}
                key={todo.id}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.complete}
                        onChange={this._onToggleComplete}/>
                    <label onDoubleClick={this._onDoubleClick}>
                        {todo.text}
                    </label>
                    <button className="destroy" onClick={this._onRemoveClick}/>
                </div>
                {input}
            </li>
        );
    },
    _onToggleComplete: function(event){
        TodoActions.toggle(this.props.todo);
    },
    _onDoubleClick: function(){
        this.setState({
            isEditing: true
        });
    },
    _onRemoveClick: function(){
        TodoActions.remove(this.props.todo);
    },
    _onSave: function(text){
        TodoActions.update(this.props.todo.id, text);
        this.setState({isEditing:false});
    }
});

module.exports = TodoItem;