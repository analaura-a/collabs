import ReactDOM from 'react-dom';
import Button from '../Button/Button';

const Modal = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    actions = []
}) => {

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={handleOverlayClick}>

            <div className="modal">
                <div className="modal-close">
                    <button className="round-button-with-icon close-icon" onClick={onClose}></button>
                </div>

                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="title-28">{title}</h2>
                        {subtitle && <p className="subtitle-18">{subtitle}</p>}
                    </div>

                    {children &&
                        <div className="modal-body">
                            {children}
                        </div>
                    }
                </div>

                <div className="modal-footer">
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            color={action.color}
                            size={action.size}
                            width={action.width}
                            onClick={action.onClick}
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>
            </div>

        </div>,
        document.body // Renderizar el modal al final del body
    );
};

export default Modal;