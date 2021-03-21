import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from "redux";
import rootReducer from "./redux/rootReducer"
import { Provider }from "react-redux"

const store = createStore(
		rootReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
			<Provider store={store}>
					<App />
			</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
