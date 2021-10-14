import { rest } from 'msw'

type LoginReqBody = {
  email: string
}

export const handlers = [
  rest.post<LoginReqBody>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
    (req, res, ctx) => {
      const { email } = req.body
      if (email === 'false@email.com') {
        return res(
          ctx.status(400),
          ctx.json({
            error: 'Bad Request',
            message: [
              {
                messages: [{ message: 'This email does not exist' }]
              }
            ]
          })
        )
      }

      return res(
        ctx.status(200),
        ctx.json({
          ok: true
        })
      )
    }
  )
]
