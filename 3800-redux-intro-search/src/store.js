import { createStore } from 'redux';

const initialState = {
  searchQuery: '',
  min: 0,
  max: 100000,
  showOnlyInStock: false,
  tags: ''
};

let reducer = (state, action) => {
  if (action.type === 'query') {
    return { ...state, searchQuery: action.q };
  }
  if (action.type === 'minimum-price') {
    return { ...state, min: action.price };
  }
  if (action.type === 'maximum-price') {
    return { ...state, max: action.price };
  }
  if (action.type === 'set-show-only-in-stock') {
    return { ...state, showOnlyInStock: action.value };
  }
  if (action.type === 'set-search-tags') {
    return { ...state, tags: action.value };
  }
  if (action.type === 'clear') {
    return { ...initialState };
  }
  return state;
};
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
