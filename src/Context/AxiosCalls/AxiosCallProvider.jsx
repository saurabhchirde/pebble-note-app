import { createContext, useContext } from "react";
import axios from "axios";
import { useModal, useAuth, usePebbleNote } from "../index";
import { useNavigate } from "react-router-dom";
import { useAnimation } from "../Animation/AnimationProvider";
import { AlertToast } from "../../Components/Alerts/AlertToast";

const axiosContext = createContext(null);

const AxiosCallProvider = ({ children }) => {
  const { dispatch } = usePebbleNote();
  const { showLoader } = useAnimation();

  const { setAlert, setShowAlert, setShowLogin, setShowSignupAlert } =
    useModal();
  const { authDispatch } = useAuth();
  const navigate = useNavigate();

  // login
  const userLogin = async (loginConfig) => {
    const { url, data } = loginConfig;

    try {
      showLoader();
      const response = await axios.post(url, data);
      if (response.status === 200) {
        setAlert(
          `Welcome back ${response.data.foundUser.firstName} ${response.data.foundUser.lastName}`
        );
        //save login credentials
        authDispatch({
          type: "login",
          payload: response.data,
        });
        //set initial data (notes and archives)
        dispatch({
          type: "authNoteInitiate",
          payload: response.data.foundUser,
        });

        showLoader();
        setShowAlert(true);
        setShowLogin(false);
        navigate("/home");
      }
      if (response.status === 201) {
        AlertToast("error", "Invalid Password, Try Again");
        showLoader();
      }
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // signup
  const userSignup = async (signupConfig) => {
    const { url, data } = signupConfig;

    try {
      showLoader();
      const response = await axios.post(url, data);
      if (response.status === 201) {
        setShowSignupAlert(true);
      }
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // add note
  const addNoteOnServer = async (noteConfig) => {
    const { url, body, headers } = noteConfig;

    try {
      showLoader();
      const res = await axios.post(url, body, headers);
      //update after adding note
      dispatch({ type: "notesAfterAddingNew", payload: res.data.notes });

      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // update note
  const updateNoteOnServer = async (noteConfig) => {
    const { url, body, headers } = noteConfig;
    try {
      showLoader();
      const res = await axios.post(url, body, headers);
      //update after adding note
      dispatch({ type: "notesAfterUpdating", payload: res.data.notes });
      AlertToast("info", "Note updated");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // remove note
  const addToTrashOnServer = async (noteConfig) => {
    const { url, headers } = noteConfig;
    //
    try {
      showLoader();
      const res = await axios.delete(url, headers);
      //update after deleting note
      dispatch({ type: "notesAfterDelete", payload: res.data.notes });
      AlertToast("success", "Note Deleted");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // add to archive
  const addNoteToArchiveOnServer = async (archiveConfig) => {
    const { url, body, headers } = archiveConfig;
    try {
      showLoader();
      const res = await axios.post(url, body, headers);
      //update after archiving note
      dispatch({ type: "notesAfterArchive", payload: res.data });
      AlertToast("success", "Note Archieved");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // remove from archive
  const restoreArchiveFromServer = async (archiveConfig) => {
    const { url, headers } = archiveConfig;

    try {
      showLoader();
      const res = await axios.post(url, {}, headers);
      //update after un-archiving note
      dispatch({ type: "notesAfterUnArchive", payload: res.data });
      AlertToast("info", "Moved to all notes");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  return (
    <axiosContext.Provider
      value={{
        userLogin,
        userSignup,
        addNoteOnServer,
        updateNoteOnServer,
        addToTrashOnServer,
        addNoteToArchiveOnServer,
        restoreArchiveFromServer,
      }}
    >
      {children}
    </axiosContext.Provider>
  );
};

const useAxiosCalls = () => useContext(axiosContext);

export { AxiosCallProvider, useAxiosCalls };
