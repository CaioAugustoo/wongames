import Joi from 'joi'

const fieldsValidations = {
  username: Joi.string().min(5).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  confirm_password: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({ 'any.only': 'confirm password does not match with password' })
}

type SignInValues = {
  email: string
  password: string
}

type SignUpValues = {
  username: string
  confirm_password: string
} & SignInValues

export type FieldErrors = {
  [key: string]: string
}

function getFieldErrors(objectErrors: Joi.ValidationResult) {
  const errors: FieldErrors = {}

  if (objectErrors.error) {
    objectErrors.error.details.forEach((err) => {
      errors[err.path.join('.')] = err.message
    })
  }

  return errors
}

export function signUpValidate(values: SignUpValues) {
  const { username, email, password, confirm_password } = fieldsValidations
  const schema = Joi.object({ username, email, password, confirm_password })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

export function signInValidate(values: SignInValues) {
  const { email, password } = fieldsValidations
  const schema = Joi.object({ email, password })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

export function forgotValidate(values: Pick<SignInValues, 'email'>) {
  const { email } = fieldsValidations
  const schema = Joi.object({ email })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}
