import { useAuth, useModal, usePebbleNote } from "../../Context";
import "./ProfilePage.css";
import Button from "../../Components/UI/Button/Button";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const {
    auth: {
      user: { firstName, lastName, dp, email },
    },
    authDispatch,
  } = useAuth();
  const {
    state: { deletedNotes, allNotes, archivedNotes },
  } = usePebbleNote();
  const { setAlert, setShowAlert } = useModal();
  const navigate = useNavigate();

  const logOutHandler = () => {
    setAlert("Your have been logged out");
    setShowAlert(true);
    navigate("/");
    authDispatch({ type: "logout" });
  };

  const pinnedNotes = [...allNotes.filter((item) => item.pinned)];
  const otherNotes = [...allNotes.filter((item) => !item.pinned)];

  return (
    <div className="body-content">
      <div className="profile-details">
        <Button
          onClick={logOutHandler}
          label="Logout"
          btnClassName="btn primary-outline-btn-md"
        />
        <div className="profile-header-section flex-col-center">
          <div className="avatar text-avatar-md-round">{dp}</div>
          <div className="user-details-section">
            <h2 className="title-xxl-wt-5">
              {firstName} {lastName}
            </h2>
            <p className="p-xl">{email}</p>
          </div>
        </div>
        <div className="profile-bottom-section flex-col">
          <h2 className="title-lg text-center">Total Notes </h2>
          <div>
            <h3>Pinned : </h3>
            {pinnedNotes.length}
          </div>
          <div>
            <h3>Un-Pinned : </h3>
            {otherNotes.length}
          </div>
          <div>
            <h3>Archived Notes : </h3>
            {archivedNotes.length}
          </div>
          <div>
            <h3>Notes in Trash : </h3>
            {deletedNotes.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };
