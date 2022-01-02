import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

    state = {
        showSidedrawer: false
    }

    closeSidedrawerHandler = () => {
        this.setState({showSidedrawer: false});
    }

    sidedrawerToggleHandler = () => {
        this.setState((prevState) => {
        return {showSidedrawer: !prevState.showSidedrawer}});
    }

    render () {
        return (
            <Aux>
                <Toolbar clicked={this.sidedrawerToggleHandler} isAuth={this.props.isAuth} />
                <Sidedrawer closed={this.closeSidedrawerHandler} show={this.state.showSidedrawer} isAuth={this.props.isAuth}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);