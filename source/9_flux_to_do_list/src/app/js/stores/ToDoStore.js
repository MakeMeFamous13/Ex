var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var ToDoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var title = '';
var _todos = {};

function create(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    };
}

function update(id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
    for (var id in _todos) {
        update(id, updates);
    }
}

function remove(id) {
    delete _todos[id];
}

function removeAll() {
    for (var id in _todos) {
        remove(id);
    }
}

function removeCompleted() {
    for (var id in _todos) {
        if (_todos[id].complete) {
            remove(id);
        }
    }
}

var TodoStore = assign({}, EventEmitter.prototype, {
    areAllComplete: function () {
        for (var id in _todos) {
            if (!_todos[id].complete) {
                return false;
            }
        }
        return true;
    },
    getAll: function () {
        return _todos;
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (action) {
    var text;

    switch (action.actionType) {
        case ToDoConstants.TODO_RENAME_TITLE:
            title = action.title;
            TodoStore.emitChange();
            break;
        case ToDoConstants.TODO_CREATE:
            text = action.text.trim();
            if (text) {
                create(text);
                TodoStore.emitChange();
            }
            break;
        case ToDoConstants.TODO_UPDATE:
            text = action.text.trim();
            if (text) {
                update(action.id, {text: text});
                TodoStore.emitChange();
            }
            break;
        case ToDoConstants.TODO_REMOVE:
            remove(action.id);
            TodoStore.emitChange();
            break;
        case ToDoConstants.TODO_REMOVE_COMPLETED:
            removeCompleted();
            TodoStore.emitChange();
            break;
        case ToDoConstants.TODO_TOGGLE_COMPLETE:
            update(action.id, {complete: true});
            TodoStore.emitChange();
            break;
        case ToDoConstants.TODO_UNDO_COMPLETE:
            update(action.id, {complete: false});
            TodoStore.emitChange();
            break;
        case ToDoConstants.TODO_TOGGLE_COMPLETE_ALL:
            var complete = false;
            if (!TodoStore.areAllComplete()) {
                complete = true;
            }
            updateAll({complete: complete});
            TodoStore.emitChange();
            break;
    }
});

module.exports = TodoStore;




