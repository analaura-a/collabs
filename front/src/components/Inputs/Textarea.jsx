
const Textarea = ({ label, name, value, rows, cols, maxlength, onChange, placeholder, helperText, errorText, required = false, ...props }) => {

    return (
        <div className="input-group-with-text">

            <div className="input-group">

                {label && <label htmlFor={name} className="form-label">
                    {label}{required && <span className="primary-color-text">*</span>}
                </label>}

                <textarea
                    name={name}
                    id={name}
                    value={value}
                    rows={rows}
                    cols={cols}
                    maxLength={maxlength}
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

export default Textarea;