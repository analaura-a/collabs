import yup from 'yup'

const accountSchemaCreate = yup.object({
    email: yup.string().trim().email().required(),
    password: yup.string().required().min(6),
})

const accountSchemaLogin = yup.object({
    email: yup.string().trim().email().required(),
    password: yup.string().required(),
})

export {
    accountSchemaCreate,
    accountSchemaLogin
}