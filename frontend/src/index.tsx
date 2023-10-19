import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persist, store} from "./app/store";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persist}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

