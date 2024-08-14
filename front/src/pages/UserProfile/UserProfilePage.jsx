import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {

    const { username } = useParams();

    return (
        <section>
            Perfil de {username}
        </section>
    )
}

export default UserProfilePage;