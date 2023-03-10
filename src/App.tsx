import Home from "./pages/Home";
import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import MuiThemeProvider from "./theme";
import "./App.css";
import Routes from "./routes";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '@thaddeusjiang/react-sortable-list/dist/index.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider>
          <ToastContainer />
          <Routes />
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
