import yup from 'yup'

const accountSchemaCreate = yup.object({
    email: yup.string().trim().email().required(),
    password: yup.string().required().min(8),
    name: yup.string().required(),
    last_name: yup.string().required()
})

const accountSchemaLogin = yup.object({
    email: yup.string().trim().email().required(),
    password: yup.string().required(),
})

export {
    accountSchemaCreate,
    accountSchemaLogin
}