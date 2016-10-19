var React = require('react/addons');
var _ = require('underscore');
var Input = require('./components/Input');

var CreateAccountScreen = React.createClass({
    getInitialState: function () {
        return {
            email: null,
            companyName: null,
            password: null,
            confirmPassword: null,
            stateValues: null,

            forbiddenWords: ["password", "user", "username"]
        };
    },

    handlePasswordInput: function(event){
        this.setState({
            password: event.target.value
        });
    },

    validatePassword: function(event){
        console.log("Password validation handled!");
        return true;
    },

    validateEmail: function (event) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(event);
    },

    showInvalid: function () {
        console.log("Show invalid function has handled");
    },

    isEmpty: function (value) {
        return !_.isEmpty(value);
    },

    handleCompanyInput: function (event) {
        this.setState({
            companyName: event.target.value
        });
    },

    handleEmailInput: function (event) {
        this.setState({
            email: event.target.value
        });
    },

    updateStatesValue: function (value) {
        this.setState({
            statesValue: value
        });
    },

    render: function () {
        return (
            <div id="accountScreen" className="create_account_screen">
                <div className="create_account_form">
                    <Input
                        text="Email Address"
                        ref="email"
                        type="text"
                        defaultValue={this.state.email}
                        validate={this.validateEmail}
                        value={this.state.email}
                        onChange={this.handleEmailInput}
                        errorMessage="Email is Invalid"
                        emptyMessage="Email can`t be empty"
                        errorVisible={this.state.showInvalid}
                    />

                    <Input
                        text="Company Name"
                        ref="companyName"
                        validate={this.isEmpty}
                        onChange={this.handleCompanyInput}
                        emptyMessage="Company Name mandatory must not be empty"
                    />

                    <a href="" target="_blank" className="link" title="Apply">
                    </a>
                </div>
            </div>
        );
    }
});

module.exports = CreateAccountScreen;