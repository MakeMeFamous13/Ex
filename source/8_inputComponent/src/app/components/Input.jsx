'use-strict';
var React = require('react/addons');
var _ = require("underscore");
var Icon = require('./Icon');
var InputError = require('./InputError');
var PasswordValidator = require('./PasswordValidator');

var Input = React.createClass({
    getInitialState: function(){
        var valid = this.props.isValid || true;

        return {
            visible: this.props.isVisible,
            valid: valid,
            focus: false,
            value: null,
            type: this.props.type,
            classname: "input",
            empty: _.isEmpty(this.props.value),
            iconsVisible: !this.props.validator,
            errorMessage: this.props.emptyMessage,
            validator: this.props.validator,
            validatorVisible: false,
            minCharacters: this.props.minCharacters,
            requireCapitals: this.props.requireCapitals,
            requireNumbers: this.props.requireNumbers,
            requireWords: this.props.requireWords,
            forbiddenWords: this.props.forbiddenWords,
            requireSymbols: this.props.requireSymbols,
            isValidatorValid: {
                minChars: false,
                capitalLetters:false,
                numbers: false,
                words:false,
                all: false
            },
            allValidatorValid: false
        };
    },

    handleChange: function(event){
        var value = event.target.value;
        this.setState({
            value: value,
            empty: _.isEmpty(value)
        });

        if(this.props.validator){
            this.checkRules(value);
        }

        if(this.props.validate){
            this.validateInput(value);
        }

        if(this.props.onChange){
            this.props.onChange(event);
        }
    },

    handleFocus: function(event){
        this.setState({
            focus: true,
            validatorVisible: true
        });

        if(this.props.validator){
            this.setState({
                errorVisible: false
            });
        }
    },

    handleBlur: function(event){
        this.setState({
            focus: false,
            errorVisible: !this.state.valid,
            validatorVisible: false
        });
    },

    mouseEnterError: function(event){
        this.setState({
            errorVisible: true
        });
    },

    hideError: function(){
        this.setState({
            errorVisble: false,
            validatorVisible: false
        });
    },

    validateInput: function(value){
        if(this.props.validate && this.props.validate(value)) {
            this.setState({
                valid: true,
                errorVisible: false
            });
        } else {
            this.setState({
                valid: false,
                errorMessage: !_.isEmpty(value) ? this.props.errorMessage : this.props.emptyMessage
            });
        }
    },

    componentWillReceiveProps: function(newProps){
        var value = newProps.value;
        if(value){
            if(!_.isUndefined(value) && value.length > 0){
                if(this.props.validate){
                    this.validateInput(value);
                }
                this.setState({
                    value: value,
                    empty: _.isEmpty(value)
                });
            }
        }
    },

    isValid: function(){
        var value = this.state.value;

        if(this.props.validate){
            if(_.isEmpty(value) || !this.props.validate(value)){
                this.setState({
                    valid: false,
                    errorVisible: true
                });
            }
        }
        return this.state.valid;
    },

    checkRules: function(value){
        var isNotEmpty = !_.isEmpty();

        var validData = {
            minChars: !_.isEmpty(value) ? value.length >= parseInt(this.state.minCharacters) : false,
            capitalLetters: !_.isEmpty(value) ? this.countCapitals(value) : false,
            numbers: !_.isEmpty(value) ? this.countNumbers(value) : false,
            words: isNotEmpty ? !this.checkWords(value) : false
        };

        var allValid = validData.capitalLetters && validData.minChars && validData.numbers && validData.words;
        this.setState({
            isValidatorValid: validData,
            allValidatorValid: allValid,
            valid: allValid
        });
    },

    countCapitals: function(value){
        return value.replace(/[^A-Z]/g, '').length;
    },

    countNumbers: function(value){
        return /\d/.test(value);
    },

    checkWords: function(value){
        return _.some(this.state.forbiddenWords, function(word){
            return (word === value) ? true : '';
        });
    },

    render: function(){
        var inputGroupClasses = {
            'input_group': true,
            'input_valid': this.state.valid,
            'input_error': !this.state.valid,
            'input_empty': this.state.empty,
            'input_hasValue': !this.state.empty,
            'input_focused': this.state.focus,
            'input_unfocused': !this.state.focus
        };

        var validator;
        if(this.state.validator){
            validator =
                <PasswordValidator
                    ref="passwordValidator"
                    visible={this.state.validatorVisible}
                    name={this.state.text}
                    value={this.state.value}
                    validData={this.state.isValidatorValid}
                    valid={this.state.allValidatorValid}
                    forbiddenWords={this.state.forbiddenWords}
                    minCharacters={this.state.minCharacters}
                    requireCapitals={this.state.requireCapitals}
                    requireNumbers={this.state.requireNumbers}
                />
        }

        return (
            <div className={inputGroupClasses}>
                <label className="input_label" htmlFor={this.props.text}>
                    <span className="label_text">{this.props.text}</span>
                </label>
                <input
                    {...this.props}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    className={this.state.className}
                    defaultValue={this.props.defaultValue}
                    value={this.state.value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    autoComplete="off"
                />
                <InputError
                    visible={this.state.errorVisible}
                    errorMessage={this.state.errorMessage}
                />
            </div>
        );
    }
});

module.exports = Input;