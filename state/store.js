import {createStore, combineReducers} from 'redux';

import {reducer as logs} from './logs';

const reducers = combineReducers({
    logs
});

export const store = createStore(reducers);
