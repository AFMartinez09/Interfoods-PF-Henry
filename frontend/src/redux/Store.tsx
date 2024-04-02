import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import Reducer from './reducer/Reducer';


const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;