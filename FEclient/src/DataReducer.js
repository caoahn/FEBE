export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

export const fetchDataRequest = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}
export const fetchDataSuccess = (data) => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data.data,
        success: data.success,
    }
}
export const fetchDataFailure = (data) => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: data.data,
        success: data.success,
    }
}
export const initialState = {
    isLoading: false,
    error: null,
    data: {},
}
export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return { ...state, isLoading: true, data: {}, success: null }
        case FETCH_DATA_SUCCESS || FETCH_DATA_FAILURE:
            return { ...state, isLoading: false, data: action.payload, success: action.success }
        default:
            return {...state, isLoading: false};
    }
}