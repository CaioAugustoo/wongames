import FormProfile from 'components/FormProfile'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import Profile from 'templates/Profile'
import protectedRoutes from 'utils/protectedRoutes'

const Me = () => {
  return (
    <Profile>
      <FormProfile />
    </Profile>
  )
}

export default Me

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: { session }
  }
}
