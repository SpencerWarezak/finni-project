const express = require('express');
const { 
    addPatient, 
    deletePatient, 
    getPatients, 
    getPatient,
    updatePatient,
} = require('../controllers/patient');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// add patient
router.post('/add', verifyToken, addPatient);

// delete patient
router.post('/delete', verifyToken, deletePatient);

// get patients
router.get('/getAll', verifyToken, getPatients);

// get patient by id
router.get('/get/:id', verifyToken, getPatient);

// update patient by id
router.put('/update', verifyToken, updatePatient);

module.exports = router;