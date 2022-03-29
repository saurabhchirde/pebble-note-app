import { BrowserRouter } from "react-router-dom";
import { AnimationProvider, ModalProvider, NoteProvider } from "./index";

const PebbleNoteProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <AnimationProvider>
        <ModalProvider>
          <NoteProvider>{children}</NoteProvider>
        </ModalProvider>
      </AnimationProvider>
    </BrowserRouter>
  );
};

export { PebbleNoteProvider };
