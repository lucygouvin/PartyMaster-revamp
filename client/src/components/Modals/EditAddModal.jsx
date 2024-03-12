import Modal from "@mui/material/Modal";

import "../../styles/Modal.css";

export default function EditAddModal({
  isActive,
  inputType,
  placeholder,
  value,
  onChange,
  title,
  onClose,
  onSave,
}) {
  return (
    <Modal open={isActive}>
      <div className="modal edit-modal">
        <p>{title}</p>
        {inputType === "textarea" ? (
          <textarea
            className="form-control"
            rows="3"
            placeholder={placeholder}
            value={value}
            required
            onChange={onChange}
          ></textarea>
        ) : (
          <input type="text"></input>
        )}
        <div className="modal-button-group">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="cta-button" onClick={onSave}>Save</button>
        </div>
      </div>
    </Modal>
  );
}
