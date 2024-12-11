const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController'); 
router.post('/addContacts', contactController.createContact);
router.get('/getcontacts', contactController.getAllContacts);
router.get('/contacts/:id', contactController.getContactById);
router.put('/contacts/:id', contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);
module.exports = router;
