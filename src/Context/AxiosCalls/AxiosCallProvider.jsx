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

      authDispatch({
        type: "login",
        payload: response.data,
      });

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
      console.log(res.data);
    } catch (error) {
      setError(error.message);
      setShowError(true);
    }
  };

  // restore note from trash
  const restoreFromTrashOnServer = async (noteConfig) => {
    const { url, body, headers, item } = noteConfig;

    try {
      const res = await axios.post(url, body, headers);
      console.log(res.data);
    } catch (error) {
      setError(error.message);
      setShowError(true);
    }
  };

  // remove note
  const addToTrashFromServer = async (noteConfig) => {
    const { url, headers, item } = noteConfig;

    try {
      const res = await axios.delete(url, headers);
      console.log(res.data);
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
      dispatch({ type: "archiveUpdate", payload: res.data.archives });
    } catch (error) {
      setError(error.message);
      setShowError(true);
    }
  };

  // remove from archive
  const removeArchiveFromServer = async (archiveConfig) => {
    const { url, headers, item } = archiveConfig;

    try {
      const res = await axios.post(url, headers);
      console.log(res.data);
    } catch (error) {
      setError(error.message);
      setShowError(true);
    }
  };

  // delete from archive
  const deleteArchiveFromServer = async (archiveConfig) => {
    const { url, headers, item } = archiveConfig;

    try {
      const res = await axios.post(url, headers);
      console.log(res.data);
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
        restoreFromTrashOnServer,
        addToTrashFromServer,
        addNoteToArchiveOnServer,
        removeArchiveFromServer,
        deleteArchiveFromServer,
      }}
    >
      {children}
    </axiosContext.Provider>
  );
};

const useAxiosCalls = () => useContext(axiosContext);

export { AxiosCallProvider, useAxiosCalls };
