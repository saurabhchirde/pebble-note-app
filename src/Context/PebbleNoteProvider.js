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
  FilterProvider,
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
                  <FilterProvider>
                    <NoteProvider>
                      <AxiosCallProvider>{children}</AxiosCallProvider>
                    </NoteProvider>
                  </FilterProvider>
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
