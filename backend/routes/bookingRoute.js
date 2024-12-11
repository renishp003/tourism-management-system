const express = require('express');
const {
    createBooking,
    getAllBookings,
    updateBookingStatus,
    deleteBooking,
    getUserBookings
} = require('../controllers/bookingontroller');

const router = express.Router();
router.post('/bookingpackage', createBooking);
router.get('/getAllBookings', getAllBookings);
router.get('/getOneBooking/:id', getUserBookings);
router.put('/updateBookingStatus/:id', updateBookingStatus);
router.delete('/deleteBooking/:id', deleteBooking);
module.exports = router;
