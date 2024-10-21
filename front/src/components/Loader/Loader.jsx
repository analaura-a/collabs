const Loader = ({ message = "Cargando...", size = "full" }) => {

    const loaderClass = size === "small" ? "loader-container small-loader" : "loader-container";

    return (
        <div className={loaderClass}>
            <div className="spinner"></div>
            <p className="subtitle-18">{message}</p>
        </div>
    );
};

export default Loader;