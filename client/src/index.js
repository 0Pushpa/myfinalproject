import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss"; // Global styles
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import { Provider } from "react-redux"; // Redux Provider
import { store, persister } from "./redux/store/Store"; // Redux store and persistor
import { PersistGate } from "redux-persist/integration/react"; // Redux persistence
import { BrowserRouter } from "react-router-dom"; // React Router
import { HelmetProvider } from "react-helmet-async";
// Create a root for React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
     <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);