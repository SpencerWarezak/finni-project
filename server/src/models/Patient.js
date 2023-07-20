const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema(
    {
        caretakerId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            default: '',
            required: true,
        },
        dob: {
            type: String,
            default: '',
            required: true
        },
        status: {
            type: String,
            default: '',
            required: true
        },
        address: {
            type: String,
            default: '',
            required: true
        },
        notes: {
            type: String,
            default: '',
            required: true
        },
        misc: {
            type: Array,
            default: [],
            required: false
        }        
    }, { timestamps: true }
);

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;
