import { BrowserRouter } from "react-router-dom";
import {
  AnimationProvider,
  ModalProvider,
  NoteProvider,
  ScrollToTop,
  ThemeProvider,
  AxiosCallProvider,
  AuthProvider,
  AlertProvider,
} from "./index";

const PebbleNoteProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <AlertProvider>
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
      </AlertProvider>
    </BrowserRouter>
  );
};

export { PebbleNoteProvider };
