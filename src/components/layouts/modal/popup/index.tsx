import "./style.css"
import { Button } from "../../../elements/actions/buttons";

type PopUpModalProps = {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    cancelLabel?: string;
    confirmLabel?: string;
    top?: string,
    bottom?: string,
    left?: string,
    right?: string,
    zIndex?: string
}

const PopUpModal = ({ message, onConfirm, onCancel,
    cancelLabel = "Cancel", confirmLabel = "Confirm",
    top, left, right, bottom, zIndex
}: PopUpModalProps) => {

    const styles:React.CSSProperties = {
        position: "absolute",
        top, left, right, bottom,
        zIndex
    }

    return (
        <div className="modal-body" style={styles}>
            <div className="modal-message-text">{ message }</div>
            <div className="modal-buttons">
                <Button variant="stroke" onClick={onCancel}>{cancelLabel}</Button>
                <Button onClick={onConfirm}>{confirmLabel}</Button>
            </div>
        </div>
    )
}

export default PopUpModal