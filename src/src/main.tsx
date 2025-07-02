import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// @ts-ignore
import App from './App.tsx'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import store from './store';

// @ts-ignore
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  </StrictMode>,
)
