import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import EditNoteModal from "./Components/UI/Modal/EditNoteModal";
import LeftNavBar from "./Components/UI/Navigation/LeftNavBar";
import NavBar from "./Components/UI/Navigation/NavBar";
import BodyWrapper from "./Components/UI/Wrapper/BodyWrapper";
import { useAnimation, useAuth, useModal, usePebbleNote } from "./Context";
import {
  LandingPage,
  HomePage,
  LabelPage,
  ArchivePage,
  TrashPage,
  ProfilePage,
  NotFound,
} from "./Pages/index";
import Login from "./Components/UI/Modal/Login";
import Signup from "./Components/UI/Modal/Signup";
import Mockman from "mockman-js";
import MobileNavBar from "./Components/UI/Navigation/MobileNavBar";
import SignupAlertModal from "./Components/UI/Modal/SignupAlertModal";
import AlertModal from "./Components/UI/Modal/AlertModal";
import AnimateLoader from "./Components/Animation/AnimateLoader";
import AnimateNote from "./Components/Animation/AnimateNote";
import { ToastContainer } from "react-toastify";

function App() {
  const { showLogin, showSignup, showSignupAlert, showAlert } = useModal();
  const { loader, loginAnimate } = useAnimation();
  const { editModal } = usePebbleNote();
  const { auth } = useAuth();

  const location = useLocation();
  const hideNav =
    location.pathname === "/" || location.pathname === "/mockman"
      ? false
      : true;

  return (
    <>
      <ToastContainer />
      {loginAnimate && <AnimateNote />}
      {loader && <AnimateLoader />}
      {showLogin && <Login />}
      {showSignup && <Signup />}
      {showSignupAlert && <SignupAlertModal />}
      {showAlert && <AlertModal />}
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
