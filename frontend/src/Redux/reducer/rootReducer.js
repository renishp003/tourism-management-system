import { combineReducers } from "redux";
import { userReducer } from './UserReducer';
import { tourPackageReducer } from "./tourPackageReducer";
import { bookingReducer } from "./bookingRedcuser";
import { userBookingReducer } from "./userBookingReducer";
import contactReducer from "./contactReduser";

const rootReducer = combineReducers({
    user:userReducer,
    tourPackages: tourPackageReducer,
    bookings:bookingReducer,
    userBookings: userBookingReducer,
    contact: contactReducer,
})

export default rootReducer