import yup from 'yup'

//Agregar
const personalProjectSchemaCreate = yup.object({
    type: yup.string().required(),
    status: yup.string().required(),
    name: yup.string().required(),
    about: yup.string().required(),
    img: yup.string().trim().nullable(),
    required_availability: yup.string().required(),
    open_positions: yup.array().of(yup.object()).required(),
    founder: yup.object().required(),
    founder_id: yup.string().required()
})

const openSourceProjectSchemaCreate = yup.object({
    type: yup.string().required(),
    status: yup.string().required(),
    name: yup.string().required(),
    about: yup.string().required(),
    img: yup.string().trim().nullable(),
    url: yup.string().url().required(),
    open_positions: yup.array().of(yup.object()).required(),
    founder: yup.object().required(),
    founder_id: yup.string().required()
})

//Editar
const personalProjectSchemaPatch = yup.object({
    type: yup.string(),
    status: yup.string(),
    name: yup.string(),
    about: yup.string(),
    img: yup.string().trim(),
    required_availability: yup.string(),
    open_positions: yup.array().of(yup.object()),
    founder: yup.object(),
    founder_id: yup.string()
})

const openSourceProjectSchemaPatch = yup.object({
    type: yup.string(),
    status: yup.string(),
    name: yup.string(),
    about: yup.string(),
    img: yup.string().trim(),
    url: yup.string().url(),
    open_positions: yup.array().of(yup.object()),
    founder: yup.object(),
    founder_id: yup.string()
})

export {
    personalProjectSchemaCreate,
    openSourceProjectSchemaCreate,
    personalProjectSchemaPatch,
    openSourceProjectSchemaPatch
}