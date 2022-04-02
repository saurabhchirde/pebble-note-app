import { createContext, useContext } from "react";
import axios from "axios";
import { useModal, useAuth, usePebbleNote } from "../index";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../Alerts/AlertProvider";
import { useAnimation } from "../Animation/AnimationProvider";

const axiosContext = createContext(null);

const AxiosCallProvider = ({ children }) => {
  const { dispatch } = usePebbleNote();
  const { showLoader } = useAnimation();

  const { setError, setShowError, setShowLogin, setShowSignupAlert } =
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
        setError(
          `Welcome back ${response.data.foundUser.firstName} ${response.data.foundUser.lastName}`
        ); //save login credentials
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
        setShowError(true);
        setShowLogin(false);
        navigate("/home");
      }
      if (response.status === 201) {
        setError("Invalid Password, Try Again");
        showLoader();
        setShowError(true);
      }
    } catch (error) {
      let msg = JSON.stringify(error);
      let parsedMsg = JSON.parse(msg);
      const alertText =
        parsedMsg.status === 404
          ? "Email Address doesn't Exist, Please Signup"
          : "Server Error, Try Again";

      setError(alertText);
      setShowError(true);
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
    } catch (error) {
      setError(error.message);
      setShowError(true);
    }
  };

  // add note
  const addNoteOnServer = async (noteConfig) => {
    const { url, body, headers, item } = noteConfig;

    try {
      const res = await axios.post(url, body, headers);
      //update after adding note
      dispatch({ type: "notesAfterAddingNew", payload: res.data.notes });
      // console.log(res.data.notes);
    } catch (error) {
      setError("Invalid Input, please try again");
      setShowError(true);
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
      showLoader();
      console.log("after update notes", res.data.notes);
    } catch (error) {
      setError(error.message);
      setShowError(true);
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
      showLoader();
    } catch (error) {
      setError(error.message);
      setShowError(true);
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
      showLoader();
    } catch (error) {
      setError(error.message);
      setShowError(true);
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
      showLoader();
    } catch (error) {
      setError(error.message);
      setShowError(true);
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
