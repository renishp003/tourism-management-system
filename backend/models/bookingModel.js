const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    tourPackage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourPackage',
        required: true
    },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
