import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                isValid: false,
                isTouched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                isValid: false,
                isTouched: false
            }
        },
        isSignedUp: true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                isValid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                isTouched: true
            })
        });

        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignedUp);
    }

    switchModeHandler = () => {
        this.setState(prevState => {return {isSignedUp: !prevState.isSignedUp}})
    }

    render () {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push(
                {
                    id: key,
                    config: this.state.controls[key]
                }
            );
        }

        let inputs = formElementsArray.map(element => {
            return (
                <Input key={element.id} 
                    elementType={element.config.elementType} 
                    elementConfig={element.config.elementConfig} 
                    value={element.config.value}
                    invalid={!element.config.isValid}
                    shouldValidate={element.config.validation}
                    isTouched={element.config.isTouched}
                    changed={(event) => this.inputChangedHandler(event, element.id)} />
            );
        })

        if(this.props.loading) {
            inputs = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = <p style={{'color': 'red'}}>{this.props.error.message}</p>
        }

        let redirect = null;
        if(this.props.isAuth) {
            redirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                {redirect}
                <form onSubmit={this.submitHandler} className={classes.Form}>
                    {inputs}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button btnType='Danger'
                    clicked={this.switchModeHandler} >Switch To {this.state.isSignedUp ? 'SIGN IN' : 'SIGN UP'}
                    </Button>
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignedUp) => dispatch(actions.auth(email, password, isSignedUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Auth);