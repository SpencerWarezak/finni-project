import {
    Box,
    Typography,
    Button,
    useTheme,
    Grid,
    IconButton,
    Tooltip,
    Card, 
    Stack,
    Skeleton
} from '@mui/material';
import Item from '@mui/material/Grid';

import Clock from 'components/Clock';
import HomePageAutocomplete from 'components/HomePageAutocomplete';
import PatientDialog from 'components/PatientDialog';
import PatientsList from 'components/PatientsList';
import PatientInfo from 'components/PatientInfo';
import { FinniIcon, FinniFox } from 'constants/finni';

import { setLogout } from 'state';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isAuth = Boolean(token);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openPatientDialog, setOpenPatientDialog] = useState(false);
    const handleClosePatientDialog = () => {
        setOpenPatientDialog(false)
    };

    const [patients, setPatients] = useState([]);
    const [currentPatient, setCurrentPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleSetCurrentPatient = async (patientId) => {
        setIsLoading(true);

        // grab the patient
        const response = await fetch(`${process.env.REACT_APP_PORT}/patient/get/${patientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (data && data.patient)
            setCurrentPatient(data.patient);

        setIsLoading(false);
    };

    const handleRemovePatient = () => {
        setPatients(patients.filter((patient) => patient._id === currentPatient._id));
        setCurrentPatient(null);
    };

    useEffect(() => {
        const getAllPatients = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_PORT}/patient/getAll`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                const data = await response.json();
                if (data && data.patients) {
                    setPatients(data.patients);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        getAllPatients();
    }, [patients]);

    const getTimeOfDay = () => {
        const time = new Date().getHours();
        if (time < 12) { return 'Good Morning'; }
        else if (time > 12 && time < 18) { return 'Good Afternoon'; }
        else return 'Good Evening';
    };

    return (        
        <div>
            {isAuth ? (
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: theme.palette.outline.main,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* MAIN CONTAINER */}
                    <Box
                        sx={{
                            paddingTop: "50px",
                            paddingX: "50px",
                            width: "100%",
                        }}
                    >
                        {/* TITLE */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                marginBottom: '1rem',
                            }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                            >
                                <Tooltip title="Logout">
                                    <IconButton 
                                        sx={{ '&:hover': { background: 'none' }}}
                                        onClick={() => { dispatch(setLogout()); navigate('/') }}
                                    >
                                        <FinniIcon sx={{ fontSize: 100, borderRadius: '33px', mr: '4rem' }} />
                                    </IconButton>
                                </Tooltip>
                                <Typography
                                    variant="h2"
                                    fontWeight="bold"
                                    sx={{
                                        color: "white",
                                    }}
                                >
                                    {`${getTimeOfDay()}, ${user.firstName}!`}
                                </Typography>
                            </Box>
                            <Clock />
                        </Box>
                        <Box>
                            {/* SEARCH BAR */}
                            <HomePageAutocomplete handleValueChange={handleSetCurrentPatient} />
                        </Box>

                        {/* MAIN CONTENT */}
                        <Box>
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    marginTop: '15px',
                                    height: 'calc(100vh - 64px - 4rem)'
                                }}
                            >
                                <Grid item xs={6}>
                                    <Item>
                                        {/* CREATE / DELETE PATIENT BUTTON */}
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Button 
                                                variant="contained"
                                                fullWidth
                                                sx={{
                                                    backgroundColor: "white",
                                                }}
                                                onClick={() => setOpenPatientDialog(true)}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: theme.palette.primary.main
                                                    }}
                                                >
                                                    Add Patient
                                                </Typography>
                                            </Button>
                                            {openPatientDialog && 
                                                <PatientDialog 
                                                    open={openPatientDialog} 
                                                    handleClose={handleClosePatientDialog} 
                                                    setPatients={setPatients}
                                                    pateints={patients}
                                                />
                                            }
                                        </Box>

                                        {/* LIST ALL PATIENTS */}
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            maxHeight="1000px"
                                        >
                                            {patients && <PatientsList
                                                patients={patients}
                                                handleSetCurrentPatient={handleSetCurrentPatient}
                                            />}
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>
                                        {currentPatient && <PatientInfo 
                                            patient={currentPatient} 
                                            isLoading={isLoading} 
                                            handleRemovePatient={handleRemovePatient}
                                        />}
                                        {!currentPatient && (
                                            <Box 
                                                sx={{
                                                    height: '1050px',
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    backgroundColor: 'white'
                                                }}
                                            >
                                                <Typography variant="h4" fontWeight="bold" sx={{ my: '3rem' }}>Please select a patient to view!</Typography>
                                                <Stack>
                                                    <Typography>Name</Typography>
                                                    <Skeleton variant="rectangular" width={500} height={60} sx={{ mb: '1rem' }} />
                                                    
                                                    <Typography>Date of Birth</Typography>
                                                    <Skeleton variant="rectangular" width={500} height={60} sx={{ mb: '1rem' }} />
                                                    
                                                    <Typography>Status</Typography>
                                                    <Skeleton variant="rectangular" width={500} height={60} sx={{ mb: '1rem' }} />
                                                    
                                                    <Typography>Address</Typography>
                                                    <Skeleton variant="rectangular" width={500} height={60} sx={{ mb: '1rem' }} />
                                                    
                                                    <Typography>Patient Notes</Typography>
                                                    <Skeleton variant="rectangular" width={500} height={350} sx={{ mb: '1rem' }} />
                                                </Stack>
                                            </Box>
                                        )}
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.background.main,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100px'
                        }}
                    >
                        Finni&nbsp;<FinniFox />&nbsp;Health
                    </Box>
                </Box>
            ) : (
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button>
                        <Typography>
                            Back to Login
                        </Typography>
                    </Button>
                </Box>
            )}
        </div>
    )
};

export default HomePage;