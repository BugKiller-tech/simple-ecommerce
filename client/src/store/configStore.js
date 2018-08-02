import {} from 'react-redux';
import { createStore } from 'redux';

import rootReducer from '../reducers';

export default function configStore() {
  const store = createStore(
    rootReducer,
  )
}