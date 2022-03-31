import { BrowserRouter } from "react-router-dom";
import {
  AnimationProvider,
  ModalProvider,
  NoteProvider,
  ScrollToTop,
  ThemeProvider,
} from "./index";

const PebbleNoteProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop>
          <AnimationProvider>
            <ModalProvider>
              <NoteProvider>{children}</NoteProvider>
            </ModalProvider>
          </AnimationProvider>
        </ScrollToTop>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export { PebbleNoteProvider };
