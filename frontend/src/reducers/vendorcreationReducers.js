import {
  VENDORCREATION_LIST_REQUEST,
  VENDORCREATION_LIST_SUCCESS,
  VENDORCREATION_LIST_FAIL,
  VENDORCREATION_DETAILS_REQUEST,
  VENDORCREATION_DETAILS_SUCCESS,
  VENDORCREATION_DETAILS_FAIL,
  VENDORCREATION_DELETE_REQUEST,
  VENDORCREATION_DELETE_SUCCESS,
  VENDORCREATION_DELETE_FAIL,
  VENDORCREATION_CREATE_RESET,
  VENDORCREATION_CREATE_FAIL,
  VENDORCREATION_CREATE_SUCCESS,
  VENDORCREATION_CREATE_REQUEST,
  VENDORCREATION_UPDATE_REQUEST,
  VENDORCREATION_UPDATE_SUCCESS,
  VENDORCREATION_UPDATE_FAIL,
  VENDORCREATION_UPDATE_RESET,
  VENDORCREATION_CREATE_REVIEW_REQUEST,
  VENDORCREATION_CREATE_REVIEW_SUCCESS,
  VENDORCREATION_CREATE_REVIEW_FAIL,
  VENDORCREATION_CREATE_REVIEW_RESET,
  VENDORCREATION_TOP_REQUEST,
  VENDORCREATION_TOP_SUCCESS,
  VENDORCREATION_TOP_FAIL,
  VENDORCREATION_TOP_RESET,
  VENDORCREATION_LIST_MY_REQUEST,
  VENDORCREATION_LIST_MY_SUCCESS,
  VENDORCREATION_LIST_MY_FAIL,
  VENDORCREATION_LIST_MY_RESET,
} from '../constants/vendorcreationConstants';

export const vendorcreationListReducer = (state = { vendorcreations: [] }, action) => {
  switch (action.type) {
    case VENDORCREATION_LIST_REQUEST:
      return { loading: true, vendorcreations: [] }
    case VENDORCREATION_LIST_SUCCESS:
      return {
        loading: false,
        vendorcreations: action.payload.vendorcreations,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case VENDORCREATION_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const vendorcreationDetailsReducer = (state = { vendorcreation: { reviews: [] } }, action) => {
  switch (action.type) {
    case VENDORCREATION_DETAILS_REQUEST:
      return { ...state, loading: true }
    case VENDORCREATION_DETAILS_SUCCESS:
      return { loading: false, vendorcreation: action.payload }
    case VENDORCREATION_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const vendorcreationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDORCREATION_DELETE_REQUEST:
      return { loading: true }
    case VENDORCREATION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case VENDORCREATION_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const vendorcreationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDORCREATION_CREATE_REQUEST:
      return { loading: true }
    case VENDORCREATION_CREATE_SUCCESS:
      return { loading: false, success: true, vendorcreation: action.payload }
    case VENDORCREATION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case VENDORCREATION_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const vendorcreationUpdateReducer = (state = { vendorcreation: {} }, action) => {
  switch (action.type) {
    case VENDORCREATION_UPDATE_REQUEST:
      return { loading: true }
    case VENDORCREATION_UPDATE_SUCCESS:
      return { loading: false, success: true, vendorcreation: action.payload }
    case VENDORCREATION_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case VENDORCREATION_UPDATE_RESET:
      return { vendorcreation: {} }
    default:
      return state
  }
}

export const vendorcreationReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDORCREATION_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case VENDORCREATION_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case VENDORCREATION_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case VENDORCREATION_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const vendorcreationTopRatedReducer = (state = { vendorcreations: [] }, action) => {
  switch (action.type) {
    case VENDORCREATION_TOP_REQUEST:
      return { loading: true, vendorcreations: [] }
    case VENDORCREATION_TOP_SUCCESS:
      return { loading: false, vendorcreations: action.payload }
    case VENDORCREATION_TOP_FAIL:
      return { loading: false, error: action.payload }
    case VENDORCREATION_TOP_RESET:
      return {}
    default:
      return state
  }
}

export const vendorcreationListMyReducer = (state = { vendorcreations: [] }, action) => {
  switch (action.type) {
    case VENDORCREATION_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case VENDORCREATION_LIST_MY_SUCCESS:
      return {
        loading: false,
        vendorcreations: action.payload,
      }
    case VENDORCREATION_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case VENDORCREATION_LIST_MY_RESET:
      return { vendorcreations: [] }
    default:
      return state
  }
}