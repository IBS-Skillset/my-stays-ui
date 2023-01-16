import { rest } from 'msw'
import userDetailsResponse from './responses/userDetailsResponse'

export const handlers = [
  rest.get(
    'http://localhost:9192/account/api/userdetails/test@gmail.com',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(userDetailsResponse.userDetails))
    },
  ),
]
