const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router()

router.post('/addUser',(req,res)=>userController.users.add(req,res))
router.post('/loginUser',(req,res)=>userController.users.loginUser(req,res))
router.get('/getUsers',(req,res)=>userController.users.get(req,res))
router.get('/getOneUser/:id',(req,res)=>userController.users.getOneUser(req,res))
router.delete('/deleteUser/:id',(req,res)=>userController.users.deleteUser(req,res))


module.exports = router;

