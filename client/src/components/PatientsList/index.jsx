import {
    Box,
    Typography,
    Card,
    CardActionArea,
    Tooltip,
    Stack,
    Skeleton,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@mui/material';

import { useEffect, useState } from 'react';

const PatientsList = ({ patients, handleSetCurrentPatient }) => {
    const [filter, setFilter] = useState('');
    const [value, setValue] = useState('');
    const [allFilters, setAllFilters] = useState(['name', 'dob', 'status', 'address', 'notes']);
    const [patientsList, setPatientsList] = useState(patients);
    useEffect(() => {
        setPatientsList(patients);
    }, [patients]);

    useEffect(() => {
        const fields = new Set();
        patients.forEach((patient) => {
            patient.misc.forEach((obj) => {
                fields.add(obj.title.trim());
            });
        });

        const newFields = Array.from(new Set([...fields, ...allFilters]));
        setAllFilters(newFields);
    }, [patients]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleValueChange = (event) => {
        const query = event.target.value;
        setValue(query);
    };

    useEffect(() => {
        if (value === '') {
            setPatientsList(patients);
        }
        else {
            const curr = [];
            
            // check all patients attributes for the given filter to see if they are included
            patients.forEach((patient) => {
                if (!patient[filter]) {
                    patient.misc.forEach((item) => {
                        if (item.title === filter && item.description.includes(value))
                            curr.push(patient);
                    });
                }
                else if (patient[filter].includes(value))
                    curr.push(patient);
            });

            setPatientsList(curr);
        }
    }, [value, filter, patients]);

    return (
        <Box
            raised
            sx={{ 
                width: "100%",
                height: "100%",
                mt: '2rem',
            }}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                   color: 'white',
                   mb: '1rem'
                }}
            >
                {patientsList.length === 1 ? 'You have 1 patient in our database' : `You have ${patientsList.length} patients in our database`}
            </Typography>
            <Box sx={{ width: '100%', display: 'flex' }}>
                <FormControl sx={{ borderRadius: '5px', mb: '1rem', width: "100%", backgroundColor: 'white' }}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                        value={filter}
                        lable="Filter"
                        onChange={handleFilterChange}
                    >
                        {allFilters.map((filter) => {
                            return (
                                <MenuItem value={filter}>{filter}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl> 
                <TextField 
                    variant="outlined" 
                    sx={{ 
                        width: '100%', 
                        borderRadius: '5px', 
                        backgroundColor: 'white',
                        mb: '1rem', 
                        ml: '1rem' 
                    }} 
                    onChange={handleValueChange}
                />
            </Box>
            <Box
                sx={{
                    height: "890px",
                    overflowY: "auto",
                    width: "100%",
                }}
            >
                {patientsList.length === 0 && (
                    <Card 
                        raised
                        sx={{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" sx={{ my: '3rem' }}>Add some patients to your database!</Typography>
                        <Stack>
                            <Box
                                display='flex'
                                justifyContent='space-between'
                                alignItems='center'
                                sx={{ mb: '1rem' }}
                            >
                                <Typography>Name</Typography>
                                <Typography>Date of Birth</Typography>
                                <Typography>Status</Typography>
                            </Box>
                            <Skeleton variant="rectangular" width={500} height={60} sx={{ mb: '1rem' }} />
                            <Skeleton variant="rectangular" width={500} height={60} sx={{ mb: '1rem' }} />
                            <Skeleton variant="rectangular" width={500} height={60} sx={{ mb: '1rem' }} />
                            <Skeleton variant="rectangular" width={500} height={60} sx={{ mb: '1rem' }} />
                            <Skeleton variant="rectangular" width={500} height={60} sx={{ mb: '1rem' }} />
                        </Stack>
                    </Card>
                )}
                {patientsList.length > 0 && patientsList.map((patient) => {
                    return (
                        <Card 
                            raised
                            sx={{
                                padding: '0.5rem',
                                my: '1rem',
                                '&:hover': {
                                    cursor: 'pointer',
                                }
                            }}
                            onClick={() => handleSetCurrentPatient(patient._id)}
                        >
                            <CardActionArea
                                sx={{ p: '0.5rem' }}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Tooltip title="Patient Name">
                                        <Typography>{patient.name}</Typography>
                                    </Tooltip>
                                    <Tooltip title="Patient Date of Birth">
                                        <Typography>{patient.dob}</Typography>
                                    </Tooltip>
                                    <Tooltip title="Patient Status">
                                        <Typography>{patient.status}</Typography>
                                    </Tooltip>
                                </Box>
                            </CardActionArea>
                        </Card>
                    )
                })}
            </Box>
        </Box>
    )
};

export default PatientsList;