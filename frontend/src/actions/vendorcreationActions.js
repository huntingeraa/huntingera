import axios from 'axios';
import {
  VENDORCREATION_LIST_MY_REQUEST,
  VENDORCREATION_LIST_MY_SUCCESS,
  VENDORCREATION_LIST_MY_FAIL,
  VENDORCREATION_LIST_REQUEST,
  VENDORCREATION_LIST_SUCCESS,
  VENDORCREATION_LIST_FAIL,
  VENDORCREATION_DETAILS_REQUEST,
  VENDORCREATION_DETAILS_SUCCESS,
  VENDORCREATION_DETAILS_FAIL,
  VENDORCREATION_DELETE_SUCCESS,
  VENDORCREATION_DELETE_REQUEST,
  VENDORCREATION_DELETE_FAIL,
  VENDORCREATION_CREATE_REQUEST,
  VENDORCREATION_CREATE_SUCCESS,
  VENDORCREATION_CREATE_FAIL,
  VENDORCREATION_UPDATE_REQUEST,
  VENDORCREATION_UPDATE_SUCCESS,
  VENDORCREATION_UPDATE_FAIL,
  VENDORCREATION_CREATE_REVIEW_REQUEST,
  VENDORCREATION_CREATE_REVIEW_SUCCESS,
  VENDORCREATION_CREATE_REVIEW_FAIL,
  VENDORCREATION_TOP_REQUEST,
  VENDORCREATION_TOP_SUCCESS,
  VENDORCREATION_TOP_FAIL
} from '../constants/vendorcreationConstants'
import { logout1 } from './vendorActions'
import { logout } from './adminActions'

export const createVendorcreation = (vendorcreation) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDORCREATION_CREATE_REQUEST,
    })

    const {
      vendorLogin: { vendorInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/vendorcreations/add`, vendorcreation, config)

    dispatch({
      type: VENDORCREATION_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: VENDORCREATION_CREATE_FAIL,
      payload: message
    })
  }
}

export const listMyVendorcreations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDORCREATION_LIST_MY_REQUEST,
    })

    const {
      vendorLogin: { vendorInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/vendorcreations/myvendorcreations`, config)

    dispatch({
      type: VENDORCREATION_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: VENDORCREATION_LIST_MY_FAIL,
      payload: message
    })
  }
}
export const updateVendorcreation = (vendorcreation) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDORCREATION_UPDATE_REQUEST,
    })

    const {
      vendorLogin: { vendorInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/vendorcreations/${vendorcreation._id}`,
      vendorcreation,
      config
    )

    dispatch({
      type: VENDORCREATION_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: VENDORCREATION_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: VENDORCREATION_UPDATE_FAIL,
      payload: message
    })
  }
}

export const updateVendorcreationA = (vendorcreation) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDORCREATION_UPDATE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/vendorcreations/admin/${vendorcreation._id}`,
      vendorcreation,
      config
    )

    dispatch({
      type: VENDORCREATION_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: VENDORCREATION_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: VENDORCREATION_UPDATE_FAIL,
      payload: message
    })
  }
}
export const listVendorcreations = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: VENDORCREATION_LIST_REQUEST });

    const { data } = await axios.get(`/api/vendorcreations?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: VENDORCREATION_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VENDORCREATION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}


export const listVendorcreationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VENDORCREATION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/vendorcreations/${id}`);

    dispatch({
      type: VENDORCREATION_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VENDORCREATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}

export const deleteVendorcreation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDORCREATION_DELETE_REQUEST,
    })

    const {
      vendorLogin: { vendorInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    }

    await axios.delete(`/api/vendorcreations/${id}`, config)

    dispatch({
      type: VENDORCREATION_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: VENDORCREATION_DELETE_FAIL,
      payload: message
    })
  }
}

export const deleteVendorcreationA = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDORCREATION_DELETE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    await axios.delete(`/api/vendorcreations/${id}`, config)

    dispatch({
      type: VENDORCREATION_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: VENDORCREATION_DELETE_FAIL,
      payload: message
    })
  }
}

export const admindeleteVendorcreation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDORCREATION_DELETE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    await axios.delete(`/api/vendorcreations/admin/${id}`, config)

    dispatch({
      type: VENDORCREATION_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: VENDORCREATION_DELETE_FAIL,
      payload: message
    })
  }
}

export const admincreateVendorcreation = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDORCREATION_CREATE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/vendorcreations/admin`, {}, config)

    dispatch({
      type: VENDORCREATION_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: VENDORCREATION_CREATE_FAIL,
      payload: message
    })
  }
}
export const adminupdateVendorcreation = (vendorcreation) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDORCREATION_UPDATE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/vendorcreations/admin/${vendorcreation._id}`,
      vendorcreation,
      config
    )

    dispatch({
      type: VENDORCREATION_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: VENDORCREATION_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: VENDORCREATION_UPDATE_FAIL,
      payload: message
    })
  }
}

export const createVendorcreationReview = (vendorcreationId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: VENDORCREATION_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/vendorcreations/${vendorcreationId}/reviews`, review, config)

    dispatch({
      type: VENDORCREATION_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: VENDORCREATION_CREATE_REVIEW_FAIL,
      payload: message
    })
  }
}

export const listTopVendorcreations = () => async (dispatch) => {
  try {
    dispatch({ type: VENDORCREATION_TOP_REQUEST });

    const { data } = await axios.get(`/api/vendorcreations/top`);

    dispatch({
      type: VENDORCREATION_TOP_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VENDORCREATION_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}