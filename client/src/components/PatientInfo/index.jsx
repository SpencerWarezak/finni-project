import {
    Box,
    Typography,
    TextField,
    Card,
    IconButton,
    CircularProgress,
    Tooltip,
    Stack,
    Skeleton,
} from '@mui/material';

import {
    Edit,
    Delete,
    Add
} from '@mui/icons-material';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const PatientInfo = ({ patient, isLoading, handleRemovePatient }) => {
    const token = useSelector((state) => state.token);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(patient.name);
    const [dob, setDob] = useState(patient.dob);
    const [status, setStatus] = useState(patient.status);
    const [address, setAddress] = useState(patient.address);
    const [notes, setNotes] = useState(patient.notes);
    const [misc, setMisc] = useState(patient.misc);

    useEffect(() => {
        setName(patient.name);
        setDob(patient.dob);
        setStatus(patient.status);
        setAddress(patient.address);
        setNotes(patient.notes);
        setMisc(patient.misc);
    }, [patient]);

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
    
    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const handleEditing = async () => {
        if (isEditing) {
            // save changes
            if (!name || !dob || !status || !address || !notes) {
                alert('Please complete all of the required fields');
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_PORT}/patient/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ patientId: patient._id, name, dob, status, address, notes, misc })
                });

                const data = await response.json();
                setName(data.patient.name);
                setDob(data.patient.dob);
                setStatus(data.patient.status);
                setAddress(data.patient.address);
                setNotes(data.patient.notes);
                setMisc(data.patient.misc);

                setIsEditing(false);
            } catch (error) {
                console.log(error);
                setIsEditing(false);                
            }
        }
        else {
            setIsEditing(true);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/patient/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ patientId: patient._id })
            });

            const data = await response.json();
            if (data && data.message) {
                alert(data.message);
                handleRemovePatient();
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleRemoveField = (event, index) => {
        const updatedMisc = [...misc];
        updatedMisc.splice(index, 1);
        setMisc(updatedMisc);
    };

    const handleAddField = (event) => {
        setMisc((prevMisc) => [
            ...prevMisc,
            { title: '', description: '' } 
        ]);
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

    return (
        <Box
            display="flex"
            justifyContent="center"
            sx={{
                px: '1rem',
                width: '100%'
            }}
        >
            {isLoading && <CircularProgress />}
            {!isLoading && patient && (
                <Card
                    raised
                    sx={{
                        height: '1050px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        width="100%"
                        padding="2rem"
                    >
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                        >
                            Patient Info
                        </Typography>
                        <Box>
                            <Tooltip title="Edit Info">
                                <IconButton onClick={handleEditing}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete User">
                                <IconButton onClick={handleDelete}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box sx={{ px: '1rem', height: '100%', overflowY: 'auto', mb: '1rem' }}>
                        {!isEditing && patient && (
                            <Stack spacing={4} sx={{ ml: '1rem' }}>
                                <Box>
                                    <Typography variant="h4" fontWeight="bold">Name</Typography>
                                    <Typography>{name}</Typography>
                                </Box>

                                <Box>
                                    <Typography variant="h4" fontWeight="bold">Date of Birth</Typography>
                                    <Typography>{dob}</Typography>
                                </Box>

                                <Box>
                                    <Typography variant="h4" fontWeight="bold">Status</Typography>
                                    <Typography>{status}</Typography>
                                </Box>

                                <Box>
                                    <Typography variant="h4" fontWeight="bold">Address</Typography>
                                    <Typography>{address}</Typography>
                                </Box>

                                <Box>
                                    <Typography variant="h4" fontWeight="bold">Patient Notes</Typography>
                                    <Typography>{notes}</Typography>
                                </Box>

                                {/* MISC ITEM MAPPING */}
                                {misc.length > 0 && misc.map((item) => {
                                    return (
                                        <Box>
                                            <Typography variant="h4" fontWeight="bold">{item.title}</Typography>
                                            <Typography>{item.description}</Typography>
                                        </Box>
                                    )
                                })}
                            </Stack>
                        )}
                        {isEditing && patient && (
                            <Stack spacing={4} sx={{ ml: '1rem' }}>
                                <Box>
                                    <Typography variant="h4" fontWeight="bold" sx={{ mb: '0.5rem' }}>Name</Typography>
                                    <TextField title="name" defaultValue={patient.name} value={name} onChange={handleNameChange} fullWidth sx={{ pr: '1rem' }} />
                                </Box>

                                <Box>
                                    <Typography variant="h4" fontWeight="bold" sx={{ mb: '0.5rem' }}>Date of Birth</Typography>
                                    <TextField title="dob" defaultValue={patient.dob} value={dob} onChange={handleDobChange} fullWidth sx={{ pr: '1rem' }} />
                                </Box>

                                <Box>
                                    <Typography variant="h4" fontWeight="bold" sx={{ mb: '0.5rem' }}>Status</Typography>
                                    <TextField title="staus" defaultValue={patient.status} value={status} onChange={handleStatusChange} fullWidth sx={{ pr: '1rem' }} />
                                </Box>

                                <Box>
                                    <Typography variant="h4" fontWeight="bold" sx={{ mb: '0.5rem' }}>Address</Typography>
                                    <TextField title="address" defaultValue={patient.address} value={address} onChange={handleAddressChange} fullWidth sx={{ pr: '1rem' }} />
                                </Box>

                                <Box>
                                    <Typography variant="h4" fontWeight="bold" sx={{ mb: '0.5rem' }}>Patient Notes</Typography>
                                    <TextField multiline rows={10} title="patient-notes" defaultValue={patient.notes} value={notes} onChange={handleNotesChange} fullWidth sx={{ pr: '1rem' }} />
                                </Box>

                                {/* MISC ITEM MAPPING */}
                                {misc.map((item, index) => {
                                    return (
                                        <Box
                                            display='flex'
                                            justifyContent='space-between'
                                            alignItems='center'
                                        >
                                            <Box width="100%">
                                                <TextField name="title" title={item.title} defaultValue={item.title} value={misc[index].title} onChange={(event) => handleMiscChange(event, index)} fullWidth sx={{ pr: '1rem', mb: '0.5rem' }} />
                                                <TextField name="description" title={item.description} defaultValue={item.description} value={misc[index].description} onChange={(event) => handleMiscChange(event, index)} fullWidth sx={{ pr: '1rem' }} />
                                            </Box>
                                            <Tooltip title="Remove Fields">
                                                <IconButton onClick={(e) => handleRemoveField(e, index)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    )
                                })}
                            </Stack>
                        )}
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        sx={{
                            mr: '1rem',
                            mb: '1rem'
                        }}
                    >
                        <Tooltip title="Add Custom Field">
                            <IconButton disabled={!isEditing} onClick={handleAddField}>
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Card>

            )}
        </Box>
    )
};

export default PatientInfo;