import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { IStudent } from './models/student';
import { IState } from './models/state';
import { reducers } from './reducers';
import { createStore, Store, applyMiddleware } from 'redux';
import { Provider} from 'react-redux';
import thunk from 'redux-thunk'

let students:IStudent[] = []

export const initialState:IState = {
    students
}

export const store: Store = createStore(
    reducers,
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>, 
document.getElementById('root'));

