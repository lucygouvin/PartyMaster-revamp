import Modal from "@mui/material/Modal";

import "../../styles/Modal.css";

export default function ConfirmDeleteModal({
  isActive,
  title,
  onClose,
  onDelete,
}) {
  return (
    <Modal open={isActive}>
      <div className="modal delete-modal">
        <p>{title}</p>
        <div className="modal-button-group">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-button" onClick={onDelete}>
            Remove
          </button>
        </div>
      </div>
    </Modal>
  );
}
