import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as actions from "./store/reducers/actionCreators";
import { bindActionCreators } from 'redux';

class App extends Component {
    constructor(props) {
        super(props);

        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(event) {
        this.props.calculatorActions[event.target.name]();
    }

    render() {
        return (
            <div className="App">
                <h1>{this.props.value}</h1>
                <button name="add" onClick={this.updateValue}>+</button>
                <button name="subtract" onClick={this.updateValue}>-</button>
                <button name="clear" onClick={this.updateValue}>clear</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        value: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        calculatorActions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
