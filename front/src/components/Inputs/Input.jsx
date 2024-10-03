
const Input = ({ label, type = 'text', name, value, onChange, placeholder, helperText, errorText, required = false, ...props }) => {

    return (

        <div className="input-group-with-text">

            <div className="input-group">

                {label && <label htmlFor={name} className="form-label">
                    {label}{required && <span className="primary-color-text">*</span>}{!required && <span className="black-light-color-text"> (opcional)</span>}
                </label>}

                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    {...props}
                />

            </div>

            {helperText && !errorText && <p className="helper-text">{helperText}</p>}
            {errorText && <p className="error-text">{errorText}</p>}

        </div>

    );

};

export default Input;