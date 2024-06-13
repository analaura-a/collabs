import * as service from "../../services/projects_requests.services.js";

//Obtener las postulaciones de un proyecto en particular
const getRequestsByProjectId = (req, res) => {

    const id = req.params.id;

    service.getRequestsByProjectId(id).then((requests) => {
        if (requests) {
            res.status(200).json(requests);
        } else {
            res.status(404).json();
        }
    });

}

//Obtener las postulaciones enviadas por un usuario en particular
const getRequestsByUserId = (req, res) => {

    const id = req.params.id;

    service.getRequestsByUserId(id).then((requests) => {
        if (requests) {
            res.status(200).json(requests);
        } else {
            res.status(404).json();
        }
    });

}

//Agregar una nueva postulación
const createRequest = async (req, res) => {

    try {

        service
            .createRequest(req.body)
            .then((newRequest) => {
                res.status(201).json(newRequest);
            })

    } catch (error) {
        console.log(error)
        res.status(500).json();
    }

}

//Editar una postulación
const editRequest = async (req, res) => {

    const id = req.params.id;

    service.editRequest(id, req.body)
        .then((editedRequest) => {
            if (editedRequest) {
                res.status(200).json(editedRequest);
            } else {
                res.status(404).json();
            }
        });

}

//Eliminar una postulación
const deleteRequest = (req, res) => {

    const id = req.params.id;

    service
        .deleteRequest(id)
        .then(() => {
            res.status(204).json();
        })
        .catch((error) => res.status(500).json());

}

export {
    getRequestsByProjectId,
    getRequestsByUserId,
    createRequest,
    editRequest,
    deleteRequest
}
