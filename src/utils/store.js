import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root'

const initialState = {};

const middleware = [thunk];

//Redux store setup
const store = createStore(
    rootReducer, 
    initialState, 
    compose(
        applyMiddleware(...middleware), //thunk middleware
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //Devtools set up
        )
    )

export default store;

