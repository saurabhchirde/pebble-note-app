import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import EditNoteModal from "./Components/UI/Modal/EditNoteModal";
import LeftNavBar from "./Components/UI/Navigation/LeftNavBar";
import NavBar from "./Components/UI/Navigation/NavBar";
import BodyWrapper from "./Components/UI/Wrapper/BodyWrapper";
import { useAuth, useModal, usePebbleNote, useTheme } from "./Context";
import LandingPage from "./Pages/LandingPage/LandingPage";
import HomePage from "./Pages/HomePage/HomePage";
import LabelPage from "./Pages/LabelPage/LabelPage";
import ArchivePage from "./Pages/ArchivePage/ArchivePage";
import TrashPage from "./Pages/TrashPage/TrashPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Login from "./Components/UI/Modal/Login";
import Signup from "./Components/UI/Modal/Signup";
import Mockman from "mockman-js";
import MobileNavBar from "./Components/UI/Navigation/MobileNavBar";
import { useEffect } from "react";
import SignupAlertModal from "./Components/UI/Modal/SignupAlertModal";
import AlertModal from "./Components/UI/Modal/AlertModal";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  const { showLogin, showSignup, showSignupAlert, showError } = useModal();
  const { editModal } = usePebbleNote();
  const { darkTheme } = useTheme();
  const { auth } = useAuth();

  const location = useLocation();
  const hideNav =
    location.pathname === "/" || location.pathname === "/mockman"
      ? false
      : true;

  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  return (
    <>
      {showLogin && <Login />}
      {showSignup && <Signup />}
      {showSignupAlert && <SignupAlertModal />}
      {showError && <AlertModal />}
      {editModal && <EditNoteModal />}
      {hideNav && auth.login && <NavBar />}
      {hideNav && auth.login && <MobileNavBar />}
      <BodyWrapper>
        {hideNav && auth.login && <LeftNavBar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {auth.login && <Route path="/home" element={<HomePage />} />}
          {auth.login && <Route path="/label" element={<LabelPage />} />}
          {auth.login && <Route path="/archive" element={<ArchivePage />} />}
          {auth.login && <Route path="/trash" element={<TrashPage />} />}
          {auth.login && <Route path="/profile" element={<ProfilePage />} />}
          <Route path="mockman" element={<Mockman />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BodyWrapper>
    </>
  );
}

export default App;
