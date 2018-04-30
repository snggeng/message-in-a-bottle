import jwt_decode from 'jwt-decode'
import { url as server_url } from './api'
import history from '../history'

export const decodeToken = () => {
  let token = window.sessionStorage.getItem('token')
  let user = jwt_decode(token)
  return user
}

export const getUser = (props) => {
  let response = {}
  if (props.isAuthenticated) {
    let token = window.sessionStorage.getItem('token')
    let user = jwt_decode(token)

    // Check if token is expired here for refresh
    // Check for token expiry on login in signIn
    const current_time = (Date.now().valueOf() / 1000)// get UTC time
    if (user.exp < current_time) {
      // console.log('token expired')
      // remove token and logout
      logout(props)
      response.error = 'You are not logged in.'
    } else {
      // console.log(user.exp < current_time)
      response.data = {
        name: user.username,
        display: user.display,
        role: user.role,
        token: token,
        _id: user._id
      }
    }
  } else {
    response.error = 'You are not logged in.'
  }
  return response
}

export const logout = async () => {
  history.push('/') // important to redirect to prevent dashboard from rendering non-existent user
  window.sessionStorage.removeItem('token')
  await fetch(server_url + '/public/signout')
}
