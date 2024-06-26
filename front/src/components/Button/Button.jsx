const Button = ({
    size = 'medium',
    color = 'primary',
    width = 'fitcontent',
    icon = null,
    onClick,
    children,
    ...props
}) => {

    let buttonClass = `btn btn-${size} btn-${color} btn-${width}`;

    if (icon) {
        buttonClass += ' btn-with-icon';
    }

    return (
        <button
            className={buttonClass}
            onClick={onClick}
            {...props}
        >{children} {icon && <span>{icon}</span>}
        </button>
    )
}

export default Button;