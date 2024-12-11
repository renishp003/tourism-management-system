const Contact = require('../models/contactModel'); 
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(200).json({ success: true, message: 'Contact created successfully', data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create contact', error: error.message });
  }
};
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve contacts', error: error.message });
  }
};
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve contact', error: error.message });
  }
};
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, subject, message } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, subject, message },
      { new: true, runValidators: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, message: 'Contact updated successfully', data: updatedContact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update contact', error: error.message });
  }
};
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete contact', error: error.message });
  }
};
module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
