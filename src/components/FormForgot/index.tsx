import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import { Email, ErrorOutline } from '@styled-icons/material-outlined'

import { FormError, FormLoading, FormWrapper } from 'components/Form'
import Button from 'components/Button'
import TextField from 'components/TextField'

import { FieldErrors, forgotValidate } from 'utils/validations'

const FormForgot = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({
    email: ''
  })
  const routes = useRouter()
  const { push, query } = routes
  const [values, setValues] = useState({
    email: ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = forgotValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${window.location.origin}${query?.email || ''}`
    })

    if (result?.url) {
      return push(result.url)
    }

    setLoading(false)
    setFormError('Email is invalid.')
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline />
          {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          error={fieldError?.email}
          name="email"
          placeholder="Email"
          type="email"
          icon={<Email />}
          value={values.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        <Button disabled={loading} size="large" fullWidth>
          {loading ? <FormLoading /> : 'Send email'}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default FormForgot
