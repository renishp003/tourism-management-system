import { ADD_CONTACT_FAILURE, ADD_CONTACT_REQUEST, ADD_CONTACT_SUCCESS, FETCH_CONTACTS_FAILURE, FETCH_CONTACTS_REQUEST, FETCH_CONTACTS_SUCCESS } from "../actionType/actionType";

  
  const initialState = {
    contacts: [],
    loading: false,
    error: null,
  };
  
  const contactReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CONTACTS_REQUEST:
      case ADD_CONTACT_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_CONTACTS_SUCCESS:
        return { ...state, loading: false, contacts: action.payload };
      case ADD_CONTACT_SUCCESS:
        return { ...state, loading: false, contacts: [...state.contacts, action.payload] };
      case FETCH_CONTACTS_FAILURE:
      case ADD_CONTACT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default contactReducer;
  