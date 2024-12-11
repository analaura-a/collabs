import { useState } from 'react';
import Button from '../Button/Button';

const OpenPositionAccordion = ({ title, children, onDelete }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion">

            <button type="button" className="accordion__header" onClick={toggleAccordion}>
                <h2 className="title-18">{title}</h2>

                <svg width="16" height="8" fill="none" xmlns="http://www.w3.org/2000/svg" className={`accordion-icon ${isOpen ? 'accordion-open' : ''}`}>
                    <path d="M1 1s5.5 6 7 6 7-6 7-6" stroke="#3B3B3C" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            <div className={`accordion__content__2 ${isOpen ? 'accordion-open' : ''}`}>

                {children}

                <Button type="button" size="small" color="red" onClick={onDelete}>
                    Eliminar
                </Button>
            </div>

        </div>
    );
};

export default OpenPositionAccordion;