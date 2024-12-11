const express = require('express');
const {
    createTourPackage,
    getAllTourPackages,
    getTourPackageById,
    updateTourPackage,
    deleteTourPackage
} = require('../controllers/tourpackages');
const upload = require('../config/fileupload');

const router = express.Router();

router.post('/addTourPackges',upload.single('image'), createTourPackage);
router.get('/getAllPackages', getAllTourPackages);
router.get('/getOnePackage/:id', getTourPackageById);
router.put('/updtePackge/:id', upload.single('image'), updateTourPackage);
router.delete('/deletePackage/:id', deleteTourPackage);

module.exports = router;
