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

const OnboardingDataSchema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es obligatorio').min(4, 'El nombre de usuario debe tener al menos 4 caracteres').max(15, 'El nombre de usuario no debe exceder los 15 caracteres'),
    roles: yup.array().of(yup.string().required('El perfil profesional es obligatorio')).min(1, 'Debe seleccionar al menos un perfil profesional'),
    skills: yup.array().of(yup.string().required('Las skills son obligatorias')).min(3, 'Debe seleccionar al menos tres skills'),
    experience: yup.string().required('El nivel de experiencia es obligatorio'),
    preferences: yup.array().of(yup.string().required('Las preferencias son obligatorias')).min(1, 'Debe seleccionar al menos una preferencia'),
    availability: yup.string().required('La disponibilidad es obligatoria'),
});

const OnboardingSchema = yup.object().shape({
    userId: yup.string().required('El ID de usuario es obligatorio').matches(/^[0-9a-fA-F]{24}$/, 'El ID de usuario debe ser un ObjectId válido'),
    onboardingData: OnboardingDataSchema.required('Los datos de onboarding son obligatorios')
});

export {
    userSchemaCreate,
    userSchemaPatch,
    OnboardingSchema
}