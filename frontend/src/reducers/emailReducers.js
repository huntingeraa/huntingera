import {
  EMAIL_REGISTER_FAIL,
  EMAIL_REGISTER_REQUEST,
  EMAIL_REGISTER_SUCCESS,
  EMAIL_LIST_REQUEST,
  EMAIL_LIST_SUCCESS,
  EMAIL_LIST_FAIL,
  EMAIL_DELETE_FAIL,
  EMAIL_DELETE_SUCCESS,
  EMAIL_DELETE_REQUEST,
} from '../constants/emailConstants'

export const emailRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_REGISTER_REQUEST:
      return { loading: true }
    case EMAIL_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case EMAIL_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const emailListReducer = (state = { emails: [] }, action) => {
  switch (action.type) {
    case EMAIL_LIST_REQUEST:
      return { loading: true }
    case EMAIL_LIST_SUCCESS:
      return { loading: false, emails: action.payload }
    case EMAIL_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const emailDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_DELETE_REQUEST:
      return { loading: true }
    case EMAIL_DELETE_SUCCESS:
      return { loading: false, success: true }
    case EMAIL_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}