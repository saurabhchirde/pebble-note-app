import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LeftNavBar from "Components/UI/Navigation/LeftNavBar";
import NavBar from "Components/UI/Navigation/NavBar";
import BodyWrapper from "Components/UI/Wrapper/BodyWrapper";
import { useAnimation, useAuth } from "Context";
import {
  LandingPage,
  HomePage,
  LabelPage,
  ArchivePage,
  TrashPage,
  ProfilePage,
  NotFound,
} from "Pages/index";
import Mockman from "mockman-js";
import MobileNavBar from "Components/UI/Navigation/MobileNavBar";
import AnimateLoader from "Components/Animation/AnimateLoader";
import AnimateNote from "Components/Animation/AnimateNote";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "Components/ProtectedRoute/ProtectedRoute";

function App() {
  const { loader, loginAnimate } = useAnimation();
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
      {hideNav && auth.login && <NavBar />}
      {hideNav && auth.login && <MobileNavBar />}
      <BodyWrapper>
        {hideNav && auth.login && <LeftNavBar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/label"
            element={
              <ProtectedRoute>
                <LabelPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/archive"
            element={
              <ProtectedRoute>
                <ArchivePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trash"
            element={
              <ProtectedRoute>
                <TrashPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="mockman" element={<Mockman />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BodyWrapper>
    </>
  );
}

export default App;
