export interface UserDetails {
  email: string
  firstName: string
  id: string
  lastName: string
  phone: string
  role: string
  address: Address
}
export interface Address {
  address: string
  city: string
  country: string
  type: string
  zipcode: string
}
