import Modal from "@mui/material/Modal";

import "../../styles/Modal.css"

export default function ConfirmDeleteModal ({isActive, title, onClose, onDelete})  {

    return(
        <Modal open={isActive}>
            <div className="modal delete-modal">
                <p>{title}</p>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>

        </Modal>
    )

}