import Heading from 'components/Heading'
import TextField from 'components/TextField'
import Button from 'components/Button'
import { AccountCircle, Email } from '@styled-icons/material-outlined'
import { FormProfileProps } from 'pages/profile/me'
import Link from 'next/link'

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

        <S.ButtonContainer>
          <Link href={`/forgot-password?email=${email}`} passHref>
            <Button minimal size="medium" as="a">
              Reset password
            </Button>
          </Link>

          <Button size="medium">Save</Button>
        </S.ButtonContainer>
      </S.Form>
    </S.Wrapper>
  )
}

export default FormProfile
