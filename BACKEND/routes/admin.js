const express = require('express');
const { AdminLogin, getAllPendingTours, AcceptTour, RejectTour } = require('../controller/adminController');

const router = express.Router();

router.post('/login', AdminLogin);
router.get('/getAllPendingReq', getAllPendingTours);
router.get('/accept/:id', AcceptTour);
router.get('/reject/:id', RejectTour);

module.exports = router;