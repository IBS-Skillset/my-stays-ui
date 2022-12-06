import { BookResponse } from '../../models/hotel/book-models/bookResponse'

export interface BookResponseAction {
  type: string
  payload: BookResponse
}
