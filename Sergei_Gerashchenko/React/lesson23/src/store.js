import {createStore} from 'redux';
import {rootReducer} from "./redures";
import { composeWithDevTools } from 'redux-devtools-extension';

export const store =  createStore(rootReducer, composeWithDevTools());