import { useModal } from "../../../Context";
import "./AlertModal.css";
import Button from "../Button/Button";

const AlertModal = () => {
  const { alert, setAlert, setShowAlert } = useModal();

  const closeClickHandler = () => {
    setShowAlert(false);
    setAlert("");
  };

  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="discard-modal-md">
        <p>{alert}</p>
        <div className="error-modal-button">
          <Button
            onClick={closeClickHandler}
            btnClassName="btn primary-outline-btn-md"
            label="Close"
          />
        </div>
      </div>
    </>
  );
};

export default AlertModal;
