
import {
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS
} from '../actionType/actionType';

const initialState = {
  loading: false,
  users: [],
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      console.log("hqqqq",action.payload)
      console.log(state)
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

      case DELETE_USER_REQUEST:
            return { ...state, loading: true };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.filter((user) => user._id !== action.payload),
            };
        case DELETE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
