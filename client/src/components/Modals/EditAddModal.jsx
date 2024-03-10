import Modal from "@mui/material/Modal";

import "../../styles/Modal.css";

export default function EditAddModal({
  isActive,
  isTextArea,
  isInput,
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
        <textarea
          show={isTextArea}
          className="form-control"
          rows="3"
          placeholder={placeholder}
          value={value}
          required
          onChange={onChange}
        ></textarea>
        <input type="text" show={isInput}></input>
        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}
