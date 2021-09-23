import Link from 'next/link'
import { FormEvent, useState } from 'react'
import {
  AccountCircle,
  Email,
  Lock,
  ErrorOutline
} from '@styled-icons/material-outlined'

import { FormWrapper, FormLink, FormLoading, FormError } from 'components/Form'
import Button from 'components/Button'
import TextField from 'components/TextField'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from 'graphql/mutations/register'
import { signIn } from 'next-auth/client'
import { FieldErrors, signUpValidate } from 'utils/validations'

const FormSignUp = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  })
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const [RegisterUser, { error, loading }] = useMutation(REGISTER_USER, {
    onError: (err) => {
      setFormError(
        err?.graphQLErrors[0]?.extensions?.exception?.data?.message[0]
          ?.messages[0]?.message
      )
    },
    onCompleted: () => {
      if (!error) {
        signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/'
        })
      }
    }
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setFormError('')

    const errors = signUpValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }

    setFieldError({})

    const { username, email, password } = values

    RegisterUser({
      variables: {
        input: {
          username,
          email,
          password
        }
      }
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
          name="username"
          placeholder="User Name"
          type="text"
          icon={<AccountCircle />}
          value={values.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          error={fieldError?.username}
        />
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          icon={<Email />}
          value={values.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={fieldError?.email}
        />
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
        <Button disabled={loading} type="submit" size="large" fullWidth>
          {loading ? <FormLoading /> : 'Sign Up now!'}
        </Button>

        <FormLink>
          Already have an account?{' '}
          <Link href="/sign-in">
            <a>Sign In</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignUp
