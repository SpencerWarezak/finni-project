import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Tooltip,
    Typography,
    TextField,
    Stack,
} from '@mui/material';

import { Close, Save, Add, Delete } from '@mui/icons-material';

import { FinniFox } from 'constants/finni';

import { useState } from 'react';
import { useSelector } from 'react-redux';

const PatientDialog = ({ open, handleClose, setPatients, patients }) => {
    const token = useSelector((state) => state.token);
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [status, setStatus] = useState('');
    const [address, setAddress] = useState('');
    const [patientNotes, setPatientNotes] = useState('');
    const [misc, setMisc] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleDobChange = (event) => {
        setDob(event.target.value);
    };
    
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    
    const handlePatientNotesChange = (event) => {
        setPatientNotes(event.target.value);
    };

    const handleMiscChange = (event, index) => {
        const { name, value } = event.target;
        const updatedMisc = [...misc];
      
        if (name === "title") {
            updatedMisc[index].title = value;
        } else if (name === "description") {
            updatedMisc[index].description = value;
        }
      
        setMisc(updatedMisc);
    };

    const handleAddField = (event) => {
        setMisc((prevMisc) => [
            ...prevMisc,
            { title: '', description: '' }
        ]);
    };

    const handleRemoveField = (event, index) => {
        const updatedMisc = [...misc];
        updatedMisc.splice(index, 1);
        setMisc(updatedMisc); 
    }


    const clearDialogValues = () => {
        setName('');
        setDob('');
        setStatus('');
        setAddress('');
        setPatientNotes('');
        setMisc([]);
    }

    const handleSavePatient = async () => {
        if (!name || !dob || !status || !address || !patientNotes) {
            alert('Please complete all of the required fields');
            return;
        }
        const patientInfo = { name, dob, status, address, patientNotes, misc };

        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/patient/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ patientInfo })
            });

            const data = await response.json();
            if (data) {
                alert(data.message);
                clearDialogValues();
                if (patients.length > 0) setPatients([...patients, data.patient]);
                else setPatients([data.patient]);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Dialog 
            open={open} 
            handleClose={handleClose} 
            hideBackdrop
        >
            <Box width="500px">
                <DialogTitle>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                        >
                            <FinniFox sx={{ mr: '1rem' }} />
                            <Typography>Add a New Patient</Typography>
                        </Box>
                        <Box>
                            <Tooltip title="Close Dialog">
                                <IconButton onClick={handleClose}>
                                    <Close />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Save Patient">
                                <IconButton onClick={handleSavePatient}>
                                    <Save />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2}>
                        <TextField title="name" placeholder="Name" value={name} onChange={handleNameChange} />
                        <TextField title="dob" placeholder="Date of Birth" value={dob} onChange={handleDobChange} />
                        <TextField title="staus" placeholder="Status" value={status} onChange={handleStatusChange} />
                        <TextField title="address" placeholder="Address" value={address} onChange={handleAddressChange} />
                        <TextField multiline rows={10} title="patient-notes" placeholder="Patient Notes" value={patientNotes} onChange={handlePatientNotesChange} />

                        {misc?.map((item, index) => {
                            return (
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Box 
                                        key={index}
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{ mr: '1rem' }}
                                    >
                                        <TextField
                                            name="title"
                                            placeholder="Title"
                                            value={item.title || ""}
                                            onChange={(event) => handleMiscChange(event, index)}
                                            sx={{ mr: '0.5rem'}}
                                        />
                                        <TextField
                                            name="description"
                                            placeholder="Description"
                                            value={item.description || ""}
                                            onChange={(event) => handleMiscChange(event, index)}
                                            sx={{ ml: '0.5rem' }}
                                        />
                                    </Box>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Tooltip title="Remove Fields">
                                            <IconButton onClick={(e) => handleRemoveField(e, index)}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Stack>

                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <Tooltip title="Add Custom Field">
                            <IconButton onClick={handleAddField}>
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </DialogContent>
            </Box>
        </Dialog>
    )
};

export default PatientDialog;