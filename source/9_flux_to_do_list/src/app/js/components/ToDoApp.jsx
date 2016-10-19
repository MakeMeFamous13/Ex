var React = require('react');
var Footer = require('./Footer');
var Header = require('./Header');
var MainSection = require('./MainSection');
var ToDoStore = require('../stores/ToDoStore');

function getToDoState(){
    return {
        allTodos: ToDoStore.getAll(),
        areAllComplete: ToDoStore.areAllComplete()
    };
}

var TodoApp = React.createClass({
    getInitialState: function(){
        return getToDoState();
    },

    componentDidMount: function(){
        ToDoStore.addChangeListener(this._onChange);
    },

    componentWillMount: function(){
        ToDoStore.removeChangeListener(this._onChange);
    },

    _onChange: function(){
        this.setState(
            getToDoState()
        );
    },

    render: function(){
        return(
            <div>
                <Header />
                <MainSection
                    allTodos={this.state.allTodos}
                    areAllComplete={this.state.areAllComplete}
                />
                <Footer allTodos={this.state.allTodos}/>
            </div>
        );
    }
});

module.exports = TodoApp;