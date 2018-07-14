import { createStore } from 'redux';
import calculator from './calculatorReducer';
import {add, subtract} from "./actionCreators";

const store = createStore(calculator);

export default store;