import {} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configStore() {
  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk, createLogger))
  )
   return store
}
