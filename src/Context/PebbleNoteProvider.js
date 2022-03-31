import { BrowserRouter } from "react-router-dom";
import {
  AnimationProvider,
  ModalProvider,
  NoteProvider,
  ScrollToTop,
} from "./index";

const PebbleNoteProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <AnimationProvider>
          <ModalProvider>
            <NoteProvider>{children}</NoteProvider>
          </ModalProvider>
        </AnimationProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export { PebbleNoteProvider };
