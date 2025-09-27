export function DeletionModal({ onConfirm, onCancel }) {
    return (
        <div className="deletion-modal">
            <p>Are you sure you want to delete this book?</p>
            <button className="confirm-btn" onClick={onConfirm}>Yes, Delete</button>
            <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
    )
}