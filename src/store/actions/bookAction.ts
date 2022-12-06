import { BookResponse } from '../../models/hotel/book-models/bookResponse'
import { BookResponseAction } from '../actionModels/book'

export function bookResponseAction(
  bookResponse: BookResponse,
): BookResponseAction {
  return {
    type: 'BOOK_RESPONSE',
    payload: bookResponse,
  }
}
