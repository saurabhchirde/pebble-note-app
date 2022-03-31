import { createContext, useContext } from "react";
import axios from "axios";
import { useModal, useAuth, usePebbleNote } from "../index";
import { useNavigate } from "react-router-dom";

const axiosContext = createContext(null);

const AxiosCallProvider = ({ children }) => {
  const { dispatch } = usePebbleNote();
  const { setError, setShowError, setShowLogin, setShowSignupAlert } =
    useModal();
  const { authDispatch } = useAuth();
  const navigate = useNavigate();

  // login
  const userLogin = async (loginConfig) => {
    const { url, data } = loginConfig;

    try {
      const response = await axios.post(url, data);
      console.log(response);
      setError(
        `Welcome back ${response.data.foundUser.firstName} ${response.data.foundUser.lastName}`
      );
      setShowError(true);

      //save login credentials
      authDispatch({
        type: "login",
        payload: response.data,
      });
      console.log(response.data.foundUser.notes);
      //set initial data (notes and archives)
      dispatch({
        type: "authNoteInitiate",
        payload: response.data.foundUser,
      });

      setShowLogin(false);
      navigate("/home");
    } catch (error) {
      setError(error.message);
      setShowError(true);
    }
  };

  // signup
  const userSignup = async (signupConfig) => {
    const { url, data } = signupConfig;

    try {
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
      console.log("notesAfterAddingNew", res.data);
    } catch (error) {
      setError(error.message);
      setShowError(true);
    }
  };

  // remove note
  const addToTrashOnServer = async (noteConfig) => {
    const { url, headers } = noteConfig;
    //
    try {
      const res = await axios.delete(url, headers);
      //update after deleting note
      dispatch({ type: "notesAfterDelete", payload: res.data.notes });
      console.log("notesAfterDelete", res.data.notes);
    } catch (error) {
      setError(error.message);
      setShowError(true);
    }
  };

  // add to archive
  const addNoteToArchiveOnServer = async (archiveConfig) => {
    const { url, body, headers } = archiveConfig;
    try {
      const res = await axios.post(url, body, headers);
      //update after archiving note
      dispatch({ type: "notesAfterArchive", payload: res.data });

      console.log("notesAfterArchive-notes", res.data.notes);
      console.log("notesAfterArchive-archive", res.data.archives);
    } catch (error) {
      setError(error.message);
      setShowError(true);
    }
  };

  // remove from archive
  const restoreArchiveFromServer = async (archiveConfig) => {
    const { url, headers } = archiveConfig;

    try {
      const res = await axios.post(url, {}, headers);
      //update after un-archiving note
      dispatch({ type: "notesAfterUnArchive", payload: res.data });
      console.log("notesAfterUnArchive-notes", res.data.notes);
      console.log("notesAfterUnArchive-archive", res.data.archives);
    } catch (error) {
      setError(error.message);
      setShowError(true);
    }
  };

  return (
    <axiosContext.Provider
      value={{
        userLogin,
        userSignup,
        addNoteOnServer,
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
