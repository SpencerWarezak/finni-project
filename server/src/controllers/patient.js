const Patient = require('../models/Patient');
const User = require('../models/User');

/**
 * Creates a new patient
 */
const addPatient = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById({ _id: userId });
        if (!user)
            return res.status(404).json({ message: 'User not found!' });

        const { name, dob, status, address, patientNotes, misc } = req.body.patientInfo;

        if (!name || !dob || !status || !address || !patientNotes)
            return res.status(403).json({ message: 'Please complete all of the required fields' });
        
        const patient = new Patient({
            caretakerId: user._id,
            name,
            dob,
            status,
            address,
            notes: patientNotes,
            misc
        });

        const rc = await patient.save();
        if (rc) return res.status(200).json({ message: 'Patient was successfully added!', patient });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Deletes a patient
 */
const deletePatient = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById({ _id: userId });
        if (!user)
            return res.status(404).json({ message: 'User not found!' });

        const patientId = req.body.patientId;
        const deleted = Boolean(await Patient.deleteOne({ _id: patientId }));
        if (deleted)
            return res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Gets all patients for a practitioner
 */
const getPatients = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById({ _id: userId });
        if (!user)
            return res.status(404).json({ message: 'User not found!' });

        const patients = await Patient.find({ caretakerId: user._id });
        if (patients)
            return res.status(200).json({ patients });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Gets the patient called by id
 */
const getPatient = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById({ _id: userId });
        if (!user)
            return res.status(404).json({ message: 'User not found!' });

        const patient = await Patient.findById({ _id: req.params.id });
        if (patient)
            return res.status(200).json({ patient });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Update the patient's information
 */
const updatePatient = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById({ _id: userId });
        if (!user)
            return res.status(404).json({ message: 'User not found!' });

        const { patientId, name, dob, status, address, notes, misc } = req.body;
        const patientData = {
            name,
            dob,
            status,
            address,
            notes,
            misc
        };

        const rc = await Patient.findOneAndUpdate({
            _id: patientId,
            caretakerId: userId,
        },
        {
            ...patientData
        },
        {
            new: true
        });

        return res.status(200).json({ message: 'Patient updated successfully', patient: rc });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addPatient,
    deletePatient,
    getPatients,
    getPatient,
    updatePatient
};