import { rest } from 'msw'
import userDetailsResponse from './responses/userDetailsResponse'
import APIConstants from '../services/constants/APIConstants'
import autocompleteResponse from './responses/autocompleteResponse'
import placeIdResponse from './responses/placeIdResponse'
import hotelAvailabilityResponse from './responses/hotelAvailabilityResponse'
import createAccountResponse from './responses/createAccountResponse'
import bookResponse from './responses/bookResponse'
import roomAvailResponse from './responses/roomAvailabilityResponse'
import AuthConstants from '../setup/oauth2/constants/AuthConstants'
import tokenResponse from './responses/tokenResponse'
import myTripsResponse from './responses/myTripsResponse'
import rateRuleResponse from './responses/rateRuleResponse'

export const handlers = [
  rest.get(APIConstants.USER_DETAILS_URL + ':email', (req, res, ctx) => {
    const { email } = req.params
    let response
    if (email === 'test@gmail.com') {
      response = userDetailsResponse.userDetails
    } else if (email == 'test@test.com') {
      response = { email: '' }
    }
    return res(ctx.status(200), ctx.json(response))
  }),
  rest.get(APIConstants.USER_DETAILS_URL, (req, res, ctx) => {
    return res(ctx.status(400), ctx.json(null))
  }),
  rest.get(APIConstants.GOOGLE_API_URL + 'autoComplete', (req, res, ctx) => {
    const location = req.url.searchParams.get('input')
    let status = 200
    let response
    if (location === 'par') {
      response = autocompleteResponse.autocomplete
    } else if (location === 'xxxyyyzzz') {
      response = { place: [] }
    } else if (location === 'error') {
      status = 400
    } else if (location == 'par_error') {
      response = { place: [{ description: 'Paris, France', placeId: 'error' }] }
    } else if (location == 'no_availability') {
      response = {
        place: [{ description: 'Paris, France', placeId: 'no_availability' }],
      }
    } else if (location == 'avail_error') {
      response = {
        place: [{ description: 'Paris, France', placeId: 'avail_error' }],
      }
    }
    return res(ctx.status(status), ctx.json(response))
  }),
  rest.get(APIConstants.GOOGLE_API_URL + 'placeId', (req, res, ctx) => {
    const placeId = req.url.searchParams.get('placeId')
    let status = 200
    let response
    if (placeId === 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ') {
      response = placeIdResponse.place
    } else if (placeId === 'error') {
      status = 400
    } else if (placeId === 'no_availability') {
      response = { latitude: '123', longitude: '456' }
    } else if (placeId === 'avail_error') {
      response = { latitude: 'error', longitude: 'error' }
    }
    return res(ctx.status(status), ctx.json(response))
  }),
  rest.post(APIConstants.HOTEL_AVAILABILITY_URL, async (req, res, ctx) => {
    const { latitude } = await req.json()
    let status = 200
    let response
    if (latitude === '123') {
      response = {
        responseStatus: {
          status: -1,
          errorMessage: 'No Availability',
          errorCode: '999',
        },
        hotelItem: [],
      }
    } else if (latitude === 'error') {
      status = 400
    } else {
      response = hotelAvailabilityResponse.hotelAvailability
    }
    return res(ctx.status(status), ctx.json(response))
  }),
  rest.post(APIConstants.CREATE_ACCOUNT_URL, async (req, res, ctx) => {
    const status = 200
    const response = createAccountResponse.signUpResponse
    return res(ctx.status(status), ctx.json(response))
  }),
  rest.post(APIConstants.HOTEL_BOOK_URL, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(bookResponse.bookResponse))
  }),
  rest.post(APIConstants.HOTEL_ROOM_AVAILABILITY_URL, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(roomAvailResponse.roomAvailResponse))
  }),
  rest.post(AuthConstants.TOKEN_URL.slice(0, -1), (req, res, ctx) => {
    const code = req.url.searchParams.get('code')
    const codeVerifier = req.url.searchParams.get('code_verifier')
    let status = 200
    let response
    if (code === 'code' && codeVerifier === 'verifier') {
      response = tokenResponse.token
    } else {
      status = 400
    }
    return res(ctx.status(status), ctx.json(response))
  }),
  rest.get(APIConstants.MY_TRIPS_URL, async (req, res, ctx) => {
    const status = 200
    const response = myTripsResponse.trips
    return res(ctx.status(status), ctx.json(response))
  }),
  rest.post(APIConstants.HOTEL_REPRICE_URL, async (req, res, ctx) => {
    let status = 200
    let response
    const { ratePlanId } = await req.json()
    if (ratePlanId === 'error') {
      status = 400
    } else {
      response = rateRuleResponse.rateRule
    }
    return res(ctx.status(status), ctx.json(response))
  }),
  rest.post(AuthConstants.REVOKE_URL.slice(0, -1), async (req, res, ctx) => {
    const status = 200
    return res(ctx.status(status))
  }),
  rest.post(AuthConstants.LOGOUT_URL.slice(0, -1), async (req, res, ctx) => {
    const status = 200
    return res(ctx.status(status))
  }),
]
