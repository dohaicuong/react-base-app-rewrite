import { useMutation } from 'react-query'

export type LoginInput = {
  email: string
  password: string
}

type LoginPayload = {

}

type LoginError = {
  statusCode: Number
  error: string
  message: string
}

export const useLoginMutation = (portal: string = '') => {
  return useMutation<LoginPayload, LoginError, LoginInput>(async data => {
    return fetch('https://api-dev.go1.co/user/account/login?allAccounts=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
        portal,
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) throw res as LoginError

      return res
    })
  })
}
