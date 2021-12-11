import Link from 'next/link'
import { useRouter } from 'next/router'

import { signOut } from 'next-auth/client'

import {
  AccountCircle,
  ExitToApp,
  FormatListBulleted
} from '@styled-icons/material-outlined'

export type ProfileMenuProps = {
  activeLink?: '/profile/me' | '/profile/orders' | string
}

import * as S from './styles'

const ProfileMenu = ({ activeLink }: ProfileMenuProps) => {
  const { push } = useRouter()

  return (
    <S.Nav>
      <Link href="/profile/me" passHref>
        <S.Link isActive={activeLink === '/profile/me'} title="My profile">
          <AccountCircle size={24} />
          <span>My profile</span>
        </S.Link>
      </Link>

      <Link href="/profile/orders" passHref>
        <S.Link isActive={activeLink === '/profile/orders'} title="My orders">
          <FormatListBulleted size={24} />
          <span>My orders</span>
        </S.Link>
      </Link>

      <S.Link
        role="button"
        onClick={async () => {
          const data = await signOut({ redirect: false, callbackUrl: '/' })
          push(data.url)
        }}
      >
        <ExitToApp size={24} />
        <span>Log out</span>
      </S.Link>
    </S.Nav>
  )
}

export default ProfileMenu
