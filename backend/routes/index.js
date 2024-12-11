const express = require('express')
const router = express.Router()

const userRoute = require('./userRoute')
const packageRoute = require('./tourpackageroute')
const bookingRoutes = require('./bookingRoute')
const contactRoute = require('./contactRoute')

router.use('/user',userRoute)
router.use('/package',packageRoute)
router.use('/bookings', bookingRoutes);
router.use('/contacts',contactRoute)

module.exports = router


