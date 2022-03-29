import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PebbleNoteProvider } from "./Context/PebbleNoteProvider";
import { AnimationProvider } from "./Context/AnimationProvider";

// import { makeServer } from "./server";

// Call make Server
// makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AnimationProvider>
      <PebbleNoteProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PebbleNoteProvider>
    </AnimationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
