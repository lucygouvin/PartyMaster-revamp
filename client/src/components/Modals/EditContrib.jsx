import Modal from "@mui/material/Modal";

import "../../styles/Modal.css";

export default function EditContribModal({
  isActive,
  isOwner,
  editBool,
  toggleOn,
  value,
  onChange,
  onClose,
  onSave,
  onDelete,
  onUnclaim,
}) {
  return (
    <Modal open={isActive}>
      <div className="modal edit-modal edit-contrib-modal">
        {/* If in edit mode, show input field and save button */}
        {editBool ? (
          <div className="item-button-group">
            <input
              type="text"
              value={value}
              required
              onChange={onChange}
              className="edit-contrib-item"
            ></input>
            <button className="button cta-button" onClick={onSave}>Save</button>
          </div>
        ) : (
            // If not in edit mode, and logged in user is the owner, show edit button
          <div className="item-button-group">
            <p className="item-name">{value}</p>
            {isOwner ? (<button className="button edit-button" onClick={toggleOn}>Edit</button>) : (<></>)}
          </div>
        )}

        <div className="contrib-modal-button-group">
          <button className = "button delete-button" onClick={onDelete}>Delete</button>
          {/* If the logged in user is the owner, they can unclaim the item */}
          {isOwner ? (
            <>
              <button className="button cta-button" onClick={onUnclaim}>Unclaim</button>
            </>
          ) : (
            <></>
          )}

          <button className="button secondary-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
