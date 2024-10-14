import { useState, useEffect } from 'react';

const ToastNotification = ({ type, title, message, onClose }) => {

    const [visible, setVisible] = useState(true);

    // Ocultar la notificación después de 5 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    return (
        <div className={`toast-notification toast-${type}`}>

            <div className="toast-notification__notification">
                <div className="toast-notification__icon">
                    <img src={`../../assets/svg/toast-${type}.svg`} alt="Notificación" />
                </div>

                <div className="toast-notification__body">
                    <h4 className="title-18">{title}</h4>
                    <p className="light-paragraph">{message}</p>
                </div>
            </div>

            <div>
                <button className="round-button-with-icon-small close-icon" onClick={() => setVisible(false)}></button>
            </div>

        </div>
    );
};

export default ToastNotification;
