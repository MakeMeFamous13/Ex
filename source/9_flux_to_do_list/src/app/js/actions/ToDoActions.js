var AppDispatcher = require('../dispatcher/dispatcher');
var TodoConstants = require('../constants/TodoConstants');

var ToDoActions = {
    renameTitle: function(text){
        AppDispatcher.dispatch({
            actionType:TodoConstants.TODO_RENAME_TITLE,
            text: text
        });
    },
    create: function(text){
        AppDispatcher.dispatch({
            actionType:TodoConstants.TODO_CREATE,
            text: text
        });
    },
    update: function(id, text){
        AppDispatcher.dispatch({
            actionType:TodoConstants.TODO_UPDATE,
            id: id,
            text: text
        });
    },
    toggle: function(todo){
        var actionType = todo.complete ? TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_TOGGLE_COMPLETE;
        var id = todo.id;

        AppDispatcher.dispatch({
            actionType: actionType,
            id: id
        });
    },
    toggleCompleteAll: function(){
        AppDispatcher.dispatch({
            actionType:TodoConstants.TODO_TOGGLE_COMPLETE_ALL
        });
    },
    undoCompleted: function(todo){
        AppDispatcher.dispatch({
            actionType:TodoConstants.TODO_UNDO_COMPLETE,
            id: todo.id
        });
    },
    remove: function(todo){
        AppDispatcher.dispatch({
            actionType:TodoConstants.TODO_REMOVE,
            id: todo.id
        });
    },
    removeCompleted: function(){
        AppDispatcher.dispatch({
            actionType:TodoConstants.TODO_REMOVE_COMPLETED
        });
    }
};

module.exports = ToDoActions;