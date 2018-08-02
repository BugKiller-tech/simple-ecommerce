import * as Types from './types';



export function userLoggedIn(user) {
  return {
    type: Types.USER_LOGGED_IN,
    user
  }
}