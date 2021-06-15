import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {reducer as logs} from './logs';

const reducers = combineReducers({
    logs
});

const persistConfig = {
    storage: AsyncStorage,
    key: 'root'
};

let rehydrationComplete
let rehydrationFailed

const rehydrationPromise = new Promise((resolve, reject) => {
  rehydrationComplete = resolve
  rehydrationFailed = reject
})

export function rehydration() {
  return rehydrationPromise
}

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducers);
export const persistor = persistStore(store, null, () => {
    rehydrationComplete()
});
