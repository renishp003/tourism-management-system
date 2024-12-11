

import { BOOK_TOUR_FAILURE, BOOK_TOUR_REQUEST, BOOK_TOUR_SUCCESS } from "../actionType/actionType";


const initialState = {
    loading: false,
    success: false,
    error: null,
    bookings: [],
};

export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOK_TOUR_REQUEST:
            return { ...state, loading: true, error: null };
        case BOOK_TOUR_SUCCESS:
            return { ...state, loading: false, success: true };
        case BOOK_TOUR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case 'FETCH_ALL_BOOKINGS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_ALL_BOOKINGS_SUCCESS':
            console.log(action.payload)
            return { ...state, loading: false, bookings: action.payload };
        case 'FETCH_ALL_BOOKINGS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
