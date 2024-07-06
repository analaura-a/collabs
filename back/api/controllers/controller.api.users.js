import * as service from "../../services/users.services.js";

//Traer todos los usuarios
const getUsers = (req, res) => {

    service.getUsers()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(404).json();
        });

};

//Traer un usuario en particular
const getUserById = (req, res) => {

    const id = req.params.id;

    service.getUserById(id)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json();
            }
        });

};

//Obtener el perfil del usuario que inició sesión
const getUserProfile = (req, res) => {

    return service.getUserById(req.account._id)
        .then(profile => res.status(200).json(profile))
        .catch(err => res.status(400).json({ message: err.message }))

}

//Crear un nuevo perfil de usuario (asociado a una cuenta existente)
const createUser = (req, res) => {

    service
        .createUser(req.account, req.body)
        .then((newUser) => {
            res.status(201).json(newUser);
        })
        .catch((error) => {
            res.status(500).json({ error: { message: error.message } });
        });

};

//Editar un usuario
const editUser = (req, res) => {

    const id = req.params.id;

    service.editUser(id, req.body)
        .then((editedUser) => {
            if (editedUser) {
                res.status(200).json(editedUser);
            } else {
                res.status(404).json();
            }
        });

}

export {
    getUsers,
    getUserById,
    getUserProfile,
    createUser,
    editUser
}