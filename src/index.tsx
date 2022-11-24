import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@material-tailwind/react';
import App from './App';
import { store } from './redux/store';
import './styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ThemeProvider />
    <ToastContainer />
  </Provider>,
  document.getElementById('root'),
);
