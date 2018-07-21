import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

const initialState = {};

/**
 * @export
 * @param {any} {}
 * @returns {object} object
 */
const configureStore = () => {
  const middleware = composeWithDevTools(applyMiddleware(thunk));

  return createStore (
    rootReducer,
    initialState,
    middleware
  );
};

export default configureStore;
