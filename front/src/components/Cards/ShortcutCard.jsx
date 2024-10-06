import DropdownButton from "../Button/DropdownButton";

const ShortcutCard = ({ shortcut }) => {

    const { name, url } = shortcut;

    const formattedUrl = url.replace(/^https?:\/\/(www\.)?/, '');

    return (
        <article className="shortcut-card">

            <a href={url} target="_blank" rel="noopener noreferrer" className="shortcut-card__link">
                <div className="shortcut-card__icon" >
                    <img src={`https://www.google.com/s2/favicons?domain=${shortcut.url}`} alt="URL" />
                </div>

                <div className="shortcut-card__details">
                    <h3 className="subtitle medium-text black-color-text">{name}</h3>
                    <p className="smaller-paragraph-light">{formattedUrl}</p>
                </div>
            </a>

            <DropdownButton options={[
                { title: 'Editar atajo', onClick: () => { console.log('editar') } },
                { title: 'Eliminar atajo', onClick: () => { console.log('eliminar') } }
            ]} />

        </article>
    );
};

export default ShortcutCard;
