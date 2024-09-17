const Select = ({ label, name, defaultText, value, onChange, options, helperText, errorText, required = false, ...props }) => {

    return (
        <div className="input-group-with-text">
            <div className="input-group">

                {label && (
                    <label htmlFor={name} className="form-label">
                        {label}{required && <span className="primary-color-text">*</span>}
                    </label>
                )}

                <select
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    {...props}
                    className="select"
                >
                    <option value="" className="placeholder-color-text">{defaultText}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {helperText && !errorText && <p className="helper-text">{helperText}</p>}
            {errorText && <p className="error-text">{errorText}</p>}
        </div>
    );
};

export default Select;
