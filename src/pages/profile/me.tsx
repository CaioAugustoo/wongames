import FormProfile from 'components/FormProfile'
import { QUERY_PROFILE_ME } from 'graphql/queries/profile'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import Profile from 'templates/Profile'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protectedRoutes'

export type FormProfileProps = {
  username: string
  email: string
}

const Me = (props: FormProfileProps) => {
  return (
    <Profile>
      <FormProfile {...props} />
    </Profile>
  )
}

export default Me

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) return { props: {} }

  const { data } = await apolloClient.query({
    query: QUERY_PROFILE_ME,
    variables: {
      identifier: session?.id
    }
  })

  return {
    props: {
      session,
      username: data?.user?.username,
      email: data?.user?.email
    }
  }
}
