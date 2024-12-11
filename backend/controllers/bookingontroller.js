const Booking = require('../models/bookingModel');
const TourPackage = require('../models/package');
const createBooking = async (req, res) => {
    try {
        const { tourPackage, customerName, customerEmail, numberOfPeople } = req.body;
        const tour = await TourPackage.findById(tourPackage);
        if (!tour) {
            return res.status(404).json({ success: false, message: 'Tour package not found' });
        }
        const totalPrice = tour.price * numberOfPeople;
        const booking = new Booking({
            tourPackage,
            customerName,
            customerEmail,
            numberOfPeople,
            totalPrice
        });
        await booking.save();
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('tourPackage');
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Booking.find({ customerEmail: userId }); 
         console.log()
        if (!bookings.length) {
            return res.status(404).json({ success: false, message: 'No bookings found for this user.' });
        }
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = {
    createBooking,
    getAllBookings,
    getUserBookings,
    updateBookingStatus,
    deleteBooking
};
