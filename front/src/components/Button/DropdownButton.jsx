import { useState } from 'react';

const DropdownButton = ({ options, className = '' }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionOnClick) => {
        optionOnClick();
        setIsOpen(false);
    };

    return (
        <div className={`dropdown-button-container ${className}`}>
            <button className=" dropdown-button" onClick={toggleDropdown}></button>

            {isOpen && (
                <ul className="dropdown-options">

                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleOptionClick(option.onClick)} className="navbar-text dropdown-option">
                            {option.title}
                        </li>
                    ))}

                </ul>
            )}
        </div>
    );
};

export default DropdownButton;
