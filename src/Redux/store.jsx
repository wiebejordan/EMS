import {createStore, combineReducers, applyMiddleware} from 'redux';
import patientReducer from './patientReducer';
import languageReducer from './languageReducer';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  patientReducer,
  languageReducer
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);


