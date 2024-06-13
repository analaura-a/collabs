import yup from 'yup'

const userSchemaCreate = yup.object({
    profile_pic: yup.string().trim().nullable(),
    name: yup.string().required(),
    last_name: yup.string().required(),
    bio: yup.string().nullable(),
    location: yup.string().nullable(),
    professional_profile: yup.array().of(yup.string()).required(),
    skills: yup.array().of(yup.string()).required(),
    experience_level: yup.string().trim().required(),
    availability: yup.string().required(),
    portfolio: yup.string().trim().url().nullable(),
    preferences: yup.array().of(yup.string()).required(),
})

const userSchemaPatch = yup.object({
    profile_pic: yup.string().trim(),
    name: yup.string(),
    last_name: yup.string(),
    bio: yup.string(),
    location: yup.string(),
    professional_profile: yup.array().of(yup.string()),
    skills: yup.array().of(yup.string()),
    experience_level: yup.string().trim(),
    availability: yup.string(),
    portfolio: yup.string().trim().url(),
    preferences: yup.array().of(yup.string()),
})

export {
    userSchemaCreate,
    userSchemaPatch
}