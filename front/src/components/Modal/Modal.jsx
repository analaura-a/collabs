import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    actions = []
}) => {

    // Evitar scroll en el fondo cuando el modal está abierto
    // useEffect(() => {
    //     if (isOpen) {
    //         if (window.innerWidth > 768) {
    //             document.body.style.overflow = 'hidden'; // Bloquea el fondo en desktop
    //         }
    //     } else {
    //         document.body.style.overflow = 'auto'; // Restaura el scroll al cerrar el modal
    //     }
    //     return () => {
    //         document.body.style.overflow = 'auto'; // Asegurarse de restaurar el scroll siempre
    //     };
    // }, [isOpen]);

    // Cerrar modal al hacer clic fuera
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null; // No renderizar si el modal no está abierto

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            className={`button ${action.type}`}
                            onClick={action.onClick}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>,
        document.body // Renderizar el modal al final del body
    );
};

export default Modal;