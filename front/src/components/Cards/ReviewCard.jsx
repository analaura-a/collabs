import { Link } from 'react-router-dom';
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ReviewCard = ({ review, reviewedUserName }) => {

    const { projectName, reviewer, comment, recommend, created_at } = review;

    const formattedDate = new Date(created_at).toLocaleDateString('en-GB');

    return (
        <article className="review-card">

            <div className="review-card__header">
                <Link to={`/colaboradores/${reviewer.username}`} className="review-card__header__user">
                    <div className="review-card__user-profile-pic">
                        <img src={reviewer.profile_pic ? `${SERVER_BASE_URL}${reviewer.profile_pic}` : "/assets/jpg/no-profile-picture.jpg"} alt={reviewer.name} />
                    </div>

                    <div>
                        <h4 className="paragraph-18 medium-text">{reviewer.name} {reviewer.last_name}</h4>
                        <p className="light-paragraph">Trabajaron juntos en el proyecto <span className="medium-text">{projectName}</span></p>
                    </div>
                </Link>

                <div className="review-card__header__recommend">
                    {recommend ?
                        (<img src="/assets/svg/thumbs-up.svg" alt="Recomienda" />)
                        :
                        (<img src="/assets/svg/thumbs-down.svg" alt="No recomienda" />)}

                    <p className="smaller-paragraph">{reviewer.name} {recommend ? 'recomienda' : 'no recomienda'} colaborar con {reviewedUserName}</p>
                </div>
            </div>

            <div className="review-card__content">
                <p className="review-card__content__comment paragraph">{comment}</p>
                <p className="review-card__content__date smaller-paragraph-light">{formattedDate}</p>
            </div>

        </article>
    );
};

export default ReviewCard;
