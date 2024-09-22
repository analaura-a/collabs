import { useState } from 'react';

const PositionAccordion = ({ positionTitle, requiredSkills, desiredSkills }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion">

            <button className="accordion__header" onClick={toggleAccordion}>
                <h2 className="title-18">{positionTitle}</h2>

                <svg width="16" height="8" fill="none" xmlns="http://www.w3.org/2000/svg" className={`accordion-icon ${isOpen ? 'accordion-open' : ''}`}>
                    <path d="M1 1s5.5 6 7 6 7-6 7-6" stroke="#3B3B3C" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            <div className={`accordion__content ${isOpen ? 'accordion-open' : ''}`}>
                <div className="accordion__section">
                    <h3 className="subtitle bold-text">Skills requeridas:</h3>

                    <ul className="accordion__section__skills">
                        {requiredSkills.map((skill, index) => (
                            <li key={index} className="smaller-paragraph accordion__required-skills">{skill}</li>
                        ))}
                    </ul>
                </div>

                {desiredSkills > 0 &&
                    <div className="accordion__section">
                        <h3 className="subtitle bold-text">Skills deseables:</h3>

                        <ul className="accordion__section__skills">
                            {desiredSkills.map((skill, index) => (
                                <li key={index} className="smaller-paragraph accordion__desired-skills">{skill}</li>
                            ))}
                        </ul>
                    </div>
                }

            </div>

        </div>
    );
};

export default PositionAccordion;