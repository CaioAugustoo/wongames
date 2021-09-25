import Heading from 'components/Heading'
import TextField from 'components/TextField'
import Button from 'components/Button'
import { AccountCircle, Email, Lock } from '@styled-icons/material-outlined'
import { FormProfileProps } from 'pages/profile/me'

import * as S from './styles'

const FormProfile = ({ username, email }: FormProfileProps) => {
  return (
    <S.Wrapper>
      <Heading size="small" color="black" lineBottom lineColor="primary">
        My profile
      </Heading>

      <S.Form>
        <TextField
          icon={<AccountCircle />}
          name="userName"
          placeholder="User Name"
          label="User Name"
          defaultValue={username}
          disabled
        />
        <TextField
          icon={<Email />}
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
          defaultValue={email}
          disabled
        />
        <TextField
          icon={<Lock />}
          type="password"
          name="password"
          placeholder="Your Password"
          label="Password"
          initialValue=""
        />
        <TextField
          icon={<Lock />}
          type="password"
          name="new_password"
          placeholder="New Password"
          label="New Password"
        />

        <Button size="large">Save</Button>
      </S.Form>
    </S.Wrapper>
  )
}

export default FormProfile
