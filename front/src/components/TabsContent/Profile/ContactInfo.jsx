const ContactInfo = ({ socials }) => {

    const validSocials = socials.filter(social => social.url || social.username);

    // Si no hay redes sociales con valores, no renderizamos la sección
    if (validSocials.length === 0) {
        return null;
    }

    const socialClasses = {
        LinkedIn: 'linkedin-social',
        GitHub: 'github-social',
        CodePen: 'codepen-social',
        Behance: 'behance-social',
        Dribbble: 'dribbble-social',
        Twitter: 'twitter-social',
        Instagram: 'instagram-social',
    };

    const baseUrls = {
        GitHub: 'https://github.com/',
        CodePen: 'https://codepen.io/',
        Twitter: "https://x.com/",
        Instagram: "https://www.instagram.com/"
    };

    const ensureHttps = (url) => {
        return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    };

    return (
        <div className="tab-profile__space-between">
            <h2 className="title-18">Datos de contacto</h2>
            <ul className="tab-profile__user-info-column__socials">

                {validSocials.map((social, index) => {

                    // Determinamos la URL a usar 
                    const href = social.url
                        ? ensureHttps(social.url)
                        : baseUrls[social.name]
                            ? `${baseUrls[social.name]}${social.username}`
                            : null;

                    return (
                        <li key={index}>
                            {href ? (
                                <a href={href} target="_blank" rel="noopener noreferrer">
                                    <button className={"small-button-with-icon " + `${socialClasses[social.name]}`}></button>
                                    <p className="smaller-paragraph">{social.name}</p>
                                </a>
                            ) : (
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <button className={"small-button-with-icon " + `${socialClasses[social.name]}`}></button>
                                    <p className="smaller-paragraph">{social.name}</p>
                                </a>
                            )}
                        </li>
                    );
                })}

            </ul>
        </div>
    );
};

export default ContactInfo;