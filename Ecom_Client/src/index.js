import ReactDOM from 'react-dom/client';

//
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import store from './redux/store/store';
import { checkToken } from './redux/action/action-creator/login/loginActionCreator';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(checkToken());

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
