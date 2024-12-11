import axios from "axios";
import { BOOK_TOUR_FAILURE, BOOK_TOUR_REQUEST, BOOK_TOUR_SUCCESS } from "../actionType/actionType";

export const bookTour = (bookingData) => async (dispatch) => {
    dispatch({ type: BOOK_TOUR_REQUEST });
    try {
        const response = await axios.post('http://localhost:3000/api/bookings/bookingpackage', bookingData); 
        dispatch({ type: BOOK_TOUR_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: BOOK_TOUR_FAILURE, payload: error.response.data.message });
    }
};

export const fetchAllBookings = () => async (dispatch) => {
    try {
        dispatch({ type: 'FETCH_ALL_BOOKINGS_REQUEST' });
        const { data } = await axios.get('http://localhost:3000/api/bookings/getAllBookings');
        dispatch({ type: 'FETCH_ALL_BOOKINGS_SUCCESS', payload: data.data });
    } catch (error) {
        dispatch({ type: 'FETCH_ALL_BOOKINGS_FAILURE', payload: error.response.data.message });
    }
};
export const fetchUserBookings = (userId) => async (dispatch) => {
    try {
        dispatch({ type: 'FETCH_USER_BOOKINGS_REQUEST' });
        const { data } = await axios.get(`http://localhost:3000/api/bookings/getOneBooking${userId}`);
        dispatch({ type: 'FETCH_USER_BOOKINGS_SUCCESS', payload: data.data });
    } catch (error) {
        dispatch({ type: 'FETCH_USER_BOOKINGS_FAILURE', payload: error.response.data.message });
    }
};