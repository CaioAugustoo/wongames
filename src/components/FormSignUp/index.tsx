import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { AccountCircle, Email, Lock } from '@styled-icons/material-outlined'

import { FormWrapper, FormLink, FormLoading } from 'components/Form'
import Button from 'components/Button'
import TextField from 'components/TextField'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from 'graphql/mutations/register'
import { signIn } from 'next-auth/client'

const FormSignUp = () => {
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const [RegisterUser, { error, loading }] = useMutation(REGISTER_USER, {
    onError: (err) => err,
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
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          placeholder="User Name"
          type="text"
          icon={<AccountCircle />}
          value={values.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
        />
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
        <TextField
          name="confirm-password"
          placeholder="Confirm Password"
          type="password"
          icon={<Lock />}
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
