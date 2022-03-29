import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PebbleNoteProvider } from "./Context/PebbleNoteProvider";

// import { makeServer } from "./server";

// Call make Server
// makeServer();

ReactDOM.render(
  <React.StrictMode>
    <PebbleNoteProvider>
      <App />
    </PebbleNoteProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
