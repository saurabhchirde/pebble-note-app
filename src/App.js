import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import EditNoteModal from "./Components/UI/Modal/EditNoteModal";
import LeftNavBar from "./Components/UI/Navigation/LeftNavBar";
import NavBar from "./Components/UI/Navigation/NavBar";
import BodyWrapper from "./Components/UI/Wrapper/BodyWrapper";
import { useModal, usePebbleNote, useTheme } from "./Context";
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

function App() {
  const { showLogin, showSignup } = useModal();
  const { editModal } = usePebbleNote();
  const { darkTheme } = useTheme();

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
      {editModal && <EditNoteModal />}
      {hideNav && <NavBar />}
      {hideNav && <MobileNavBar />}
      <BodyWrapper>
        {hideNav && <LeftNavBar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/label" element={<LabelPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/trash" element={<TrashPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="mockman" element={<Mockman />} />
        </Routes>
      </BodyWrapper>
    </>
  );
}

export default App;
