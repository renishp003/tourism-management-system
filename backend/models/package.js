const mongoose = require('mongoose');
const tourPackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    maxCapacity: {
        type: Number,
        default: 20  
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
});
const TourPackage = mongoose.model('TourPackage', tourPackageSchema);
module.exports = TourPackage;
