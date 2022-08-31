//import * as crypto from 'crypto-js'
import Base64 from 'crypto-js/enc-base64'
//import sha256 from 'crypto-js/sha256'

const base64Url = (str: any) => {
  return str
    .toString(Base64)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

const generateCodeVerifier = () => {
  return 'Y08KklENWwZLg8jnTTJYbLX1T-H8NR5QgYUTXqguPjo'
  //return base64Url(crypto.enc.Base64.stringify(crypto.lib.WordArray.random(32)))
}

const generateCodeChallenge = () => {
  return 'QysqzJRQA6MCVV-WwK2x8hIX0fRimWZSYq5ZWLC3voQ'
  //const codeVerifier = sessionStorage.getItem(`codeVerifier`) || ''
  //return base64Url(sha256(codeVerifier))
}

export { base64Url, generateCodeVerifier, generateCodeChallenge }
