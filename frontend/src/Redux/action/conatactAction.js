import axios from "axios";
import { ADD_CONTACT_FAILURE, ADD_CONTACT_REQUEST, ADD_CONTACT_SUCCESS, FETCH_CONTACTS_FAILURE, FETCH_CONTACTS_REQUEST, FETCH_CONTACTS_SUCCESS } from "../actionType/actionType";

export const fetchContacts = () => async (dispatch) => {
    dispatch({ type: FETCH_CONTACTS_REQUEST });
  
    try {
      const response = await axios.get('http://localhost:3000/api/contacts/getcontacts');
      dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: FETCH_CONTACTS_FAILURE, payload: error.message });
    }
  };
  
  // Add Contact Action
  export const addContact = (contactData) => async (dispatch) => {
    dispatch({ type: ADD_CONTACT_REQUEST });
  
    try {
      const response = await axios.post('http://localhost:3000/api/contacts/addContacts', contactData);
      dispatch({ type: ADD_CONTACT_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: ADD_CONTACT_FAILURE, payload: error.message });
    }
  };