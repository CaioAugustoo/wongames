import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import { Lock, ErrorOutline } from '@styled-icons/material-outlined'

import { FormError, FormLoading, FormWrapper } from 'components/Form'
import Button from 'components/Button'
import TextField from 'components/TextField'

import { FieldErrors, resetValidate } from 'utils/validations'

const FormReset = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({
    password: '',
    confirm_password: ''
  })
  const routes = useRouter()
  const { query } = routes
  const [values, setValues] = useState({
    password: '',
    confirm_password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = resetValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: query.code,
          password: values.password,
          passwordConfirmation: values.confirm_password
        })
      }
    )

    const json = await response.json()
    setLoading(false)

    if (json.error) {
      setFormError(json.message[0]?.messages[0]?.message)
      return
    }

    signIn('credentials', {
      email: json.user?.email,
      password: values.password,
      callbackUrl: '/'
    })
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
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
          value={values.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={fieldError?.password}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm Password"
          type="password"
          icon={<Lock />}
          value={values.confirm_password}
          onChange={(e) =>
            handleInputChange('confirm_password', e.target.value)
          }
          error={fieldError?.confirm_password}
        />
        <Button disabled={loading} size="large" fullWidth>
          {loading ? <FormLoading /> : 'Reset password'}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default FormReset
