import { FormEvent, useState } from 'react'

import {
  CheckCircleOutline,
  Email,
  ErrorOutline
} from '@styled-icons/material-outlined'

import {
  FormError,
  FormLoading,
  FormSuccess,
  FormWrapper
} from 'components/Form'
import Button from 'components/Button'
import TextField from 'components/TextField'

import { FieldErrors, forgotValidate } from 'utils/validations'
import { useRouter } from 'next/router'

const FormForgot = () => {
  const { query } = useRouter()
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({
    email: ''
  })
  const [values, setValues] = useState({
    email: (query?.email as string) || ''
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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
    )

    const json = await response.json()
    setLoading(false)

    if (json.error) {
      setFormError(json.message[0]?.messages[0]?.message)
      return
    }

    setSuccess(true)
  }

  return (
    <FormWrapper>
      {success ? (
        <FormSuccess>
          <CheckCircleOutline />
          Email sent!
        </FormSuccess>
      ) : (
        <>
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
              defaultValue={query.email as string}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <Button disabled={loading} size="large" fullWidth>
              {loading ? <FormLoading /> : 'Send email'}
            </Button>
          </form>
        </>
      )}
    </FormWrapper>
  )
}

export default FormForgot
