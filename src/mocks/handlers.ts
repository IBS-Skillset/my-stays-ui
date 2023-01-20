import { rest } from 'msw'
import userDetailsResponse from './responses/userDetailsResponse'
import APIConstants from '../services/constants/APIConstants'
import autocompleteResponse from './responses/autocompleteResponse'
import placeIdResponse from './responses/placeIdResponse'
import hotelAvailabilityResponse from './responses/hotelAvailabilityResponse'
import createAccountResponse from './responses/createAccountResponse'

export const handlers = [
  rest.get(APIConstants.USER_DETAILS_URL + ':email', (req, res, ctx) => {
    const { email } = req.params
    let status = 200
    let response
    if (email === 'test@gmail.com') {
      response = userDetailsResponse.userDetails
    } else if (email == '') {
      status = 400
    }
    return res(ctx.status(status), ctx.json(response))
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
]
