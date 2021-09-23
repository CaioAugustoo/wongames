import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import { Email, Lock } from '@styled-icons/material-outlined'

import { FormLink, FormWrapper } from 'components/Form'
import Button from 'components/Button'
import TextField from 'components/TextField'

import * as S from './styles'

const FormSignIn = () => {
  const { push } = useRouter()
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/'
    })

    if (result?.url) {
      return push(result.url)
    }
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          icon={<Email />}
          value={values.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
          value={values.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
        />
        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>
        <Button size="large" fullWidth>
          Sign in now!
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
