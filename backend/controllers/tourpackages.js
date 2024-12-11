const TourPackage = require('../models/package');
const path = require('path');

const createTourPackage = async (req, res) => {
    try {
        const { name, description, price, duration, maxCapacity, startDate, endDate } = req.body;
        let imageUrl = '';
        if (req.file) {
            imageUrl = path.join(req.file.filename);
        }
        const tourPackage = new TourPackage({
            name,
            description,
            price,
            duration,
            maxCapacity,
            startDate,
            endDate,
            image: imageUrl
        });
        await tourPackage.save();
        res.status(201).json({ success: true, data: tourPackage });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
};
const getAllTourPackages = async (req, res) => {
    try {
        const tourPackages = await TourPackage.find();
        res.status(200).json({ success: true, data: tourPackages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getTourPackageById = async (req, res) => {
    try {
        const tourPackage = await TourPackage.findById(req.params.id);
        if (!tourPackage) {
            return res.status(404).json({ success: false, message: 'Tour package not found' });
        }
        res.status(200).json({ success: true, data: tourPackage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const updateTourPackage = async (req, res) => {
    try {
        const tourPackage = await TourPackage.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true
        });
        if (!tourPackage) {
            return res.status(404).json({ success: false, message: 'Tour package not found' });
        }
        res.status(200).json({ success: true, data: tourPackage });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const deleteTourPackage = async (req, res) => {
    try {
        const tourPackage = await TourPackage.findByIdAndDelete(req.params.id);
        if (!tourPackage) {
            return res.status(404).json({ success: false, message: 'Tour package not found' });
        }
        res.status(200).json({ success: true, message: 'Tour package deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = {
    createTourPackage,
    getAllTourPackages,
    getTourPackageById,
    updateTourPackage,
    deleteTourPackage
};
