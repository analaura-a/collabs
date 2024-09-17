import { useRef, useState } from 'react';
import Button from '../Button/Button';
import ExportIcon from '../../assets/svg/export.svg?react';

const FileInput = ({ label, name, buttonText = "Selecciona un archivo", onFileSelect, accept = 'image/*', helperText, errorText, required = false }) => {

    const [fileName, setFileName] = useState(buttonText);

    const fileInputRef = useRef(null);

    const triggerFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name); // Cambiar el texto del botón al nombre del archivo seleccionado
            onFileSelect(file); // Envía el archivo seleccionado al componente padre
        }
    };

    return (
        <div className="input-group-with-text">
            <div className="input-group">
                {label && (
                    <label htmlFor={name} className="form-label">
                        {label}{required && <span className="primary-color-text">*</span>}{!required && <span className="black-light-color-text"> (opcional)</span>}
                    </label>
                )}

                <Button type="button" color="secondary" size="large" width="full" icon={<ExportIcon />} onClick={triggerFileInputClick}>
                    {fileName}
                </Button>

                <input
                    type="file"
                    id={name}
                    name={name}
                    accept={accept}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>

            {helperText && !errorText && <p className="helper-text">{helperText}</p>}
            {errorText && <p className="error-text">{errorText}</p>}
        </div>
    );
};

export default FileInput;
