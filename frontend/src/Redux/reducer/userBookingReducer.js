const initialState = {
    loading: false,
    userBookings: [],
    error: null,
};

export const userBookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_BOOKINGS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_USER_BOOKINGS_SUCCESS':
            return { ...state, loading: false, userBookings: action.payload };
        case 'FETCH_USER_BOOKINGS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
