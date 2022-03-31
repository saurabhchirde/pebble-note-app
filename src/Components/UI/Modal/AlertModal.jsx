import { useModal } from "../../../Context";
import "./AlertModal.css";
import Button from "../Button/Button";

const AlertModal = () => {
  const { error, setError, setShowError } = useModal();

  const closeClickHandler = () => {
    setShowError(false);
    setError("");
  };

  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="discard-modal-md">
        <p>{error}</p>
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
