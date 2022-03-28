import { Route, Routes } from "react-router-dom";
import "./App.css";
import EditNoteModal from "./Components/UI/Modal/EditNoteModal";
import LeftNavBar from "./Components/UI/Navigation/LeftNavBar";
import NavBar from "./Components/UI/Navigation/NavBar";
import BodyWrapper from "./Components/UI/Wrapper/BodyWrapper";
import { usePebbleNote } from "./Context/PebbleNoteProvider";
import LandingPage from "./Pages/LandingPage/LandingPage";
import HomePage from "./Pages/HomePage/HomePage";
import LabelPage from "./Pages/LabelPage/LabelPage";
import ArchivePage from "./Pages/ArchivePage/ArchivePage";
import TrashPage from "./Pages/TrashPage/TrashPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {
  const { editModal } = usePebbleNote();
  return (
    <>
      {editModal && <EditNoteModal />}
      <NavBar />
      <BodyWrapper>
        <LeftNavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/label" element={<LabelPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/trash" element={<TrashPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BodyWrapper>
    </>
  );
}

export default App;
