import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import { Email, Lock, ErrorOutline } from '@styled-icons/material-outlined'

import { FormError, FormLink, FormLoading, FormWrapper } from 'components/Form'
import Button from 'components/Button'
import TextField from 'components/TextField'

import { FieldErrors, signInValidate } from 'utils/validations'

import * as S from './styles'

const FormSignIn = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({
    email: '',
    password: ''
  })
  const routes = useRouter()
  const { push, query } = routes
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = signInValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
    })

    if (result?.url) {
      return push(result.url)
    }

    setLoading(false)
    setFormError('Email or password is invalid.')
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
        <TextField
          error={fieldError?.password}
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
          value={values.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
        />
        <Link href="/forgot-password" passHref>
          <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>
        </Link>
        <Button disabled={loading} size="large" fullWidth>
          {loading ? <FormLoading /> : 'Sign in now!'}
        </Button>

        <FormLink>
          Do not have an account yet?{' '}
          <Link href="/sign-up">
            <a>Sign Up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
