import { BrowserRouter } from "react-router-dom";
import {
  AnimationProvider,
  ModalProvider,
  NoteProvider,
  ScrollToTop,
  ThemeProvider,
  AxiosCallProvider,
  AuthProvider,
} from "./index";

const PebbleNoteProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ScrollToTop>
            <AnimationProvider>
              <ModalProvider>
                <NoteProvider>
                  <AxiosCallProvider>{children}</AxiosCallProvider>
                </NoteProvider>
              </ModalProvider>
            </AnimationProvider>
          </ScrollToTop>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export { PebbleNoteProvider };
