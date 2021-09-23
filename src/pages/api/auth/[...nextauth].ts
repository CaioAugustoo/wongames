import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

type AuthorizeProps = {
  email: string
  password: string
}

const options = {
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    Providers.Credentials({
      name: 'Sign-in',
      credentials: {},
      async authorize({ email, password }: AuthorizeProps) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
          method: 'POST',
          body: new URLSearchParams({ identifier: email, password })
        })
        const { user, jwt } = await res.json()

        if (user) {
          return { ...user, jwt }
        }

        return null
      }
    })
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: async (session: any, user: any) => {
      session.jwt = user.jwt
      session.id = user.id

      return Promise.resolve(session)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt: async (token: any, user: any) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.username = user.username
      }

      return Promise.resolve(token)
    }
  }
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)

export default Auth
