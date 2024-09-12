import * as service from "../../services/projects_requests.services.js";

// //Obtener las postulaciones de un proyecto en particular
// const getRequestsByProjectId = (req, res) => {

//     const id = req.params.id;

//     service.getRequestsByProjectId(id).then((requests) => {
//         if (requests) {
//             res.status(200).json(requests);
//         } else {
//             res.status(404).json();
//         }
//     });

// }

//Obtener las postulaciones de un usuario por id
const getRequestsByUserId = async (req, res) => {

    const { userId } = req.params;

    try {
        const requests = await service.getRequestsByUserId(userId);

        if (!requests || requests.length === 0) {
            return res.status(404).json({ message: 'No se encontraron postulaciones para este usuario.' });
        }

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener las postulaciones del usuario.' });
    }
};

//Agregar una nueva postulación
const createRequest = async (req, res) => {

    const { userId, projectId, appliedRole, openPositionId } = req.body;

    try {
        const request = await service.createRequest({ userId, projectId, appliedRole, openPositionId });

        return res.status(201).json({
            message: 'Postulación enviada con éxito.',
            request
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error al crear la postulación.',
            error: error.message
        });
    }
};

// //Editar una postulación
// const editRequest = async (req, res) => {

//     const id = req.params.id;

//     service.editRequest(id, req.body)
//         .then((editedRequest) => {
//             if (editedRequest) {
//                 res.status(200).json(editedRequest);
//             } else {
//                 res.status(404).json();
//             }
//         });

// }

// //Eliminar una postulación
// const deleteRequest = (req, res) => {

//     const id = req.params.id;

//     service
//         .deleteRequest(id)
//         .then(() => {
//             res.status(204).json();
//         })
//         .catch((error) => res.status(500).json());

// }

export {
    // getRequestsByProjectId,
    getRequestsByUserId,
    createRequest,
    // editRequest,
    // deleteRequest
}
