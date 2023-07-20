import { useState, useMemo, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import throttle from 'lodash.throttle';

import { FinniFox } from 'constants/finni';

import { 
    Autocomplete,
    TextField,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Chip,
    Typography,
    Card,
    CircularProgress,
} from '@mui/material';

const throttleTime = 1000;

const HomePageAutocomplete = ({ handleValueChange }) => {
    const token = useSelector((state) => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const getPatients = async (query) => {
        setIsLoading(true);
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
                setOptions(data.patients.filter((patient) => patient.name.toLowerCase().includes(query.toLowerCase())));
                setIsLoading(false);
            }
        } catch (error) {
            setOptions([]);
            setIsLoading(false);
            console.log(error.message);
        }
    };

    const handleAutocompleteChange = async (event, value) => {
        let query = event.target.value;
        if (!query) query = "";
        if (query.length > 0) query = query.trim();

        if (query !== '') {
            setOptions([]);
            await getPatients(query);
        }
    };

    const throttledHandleAutocompleteChange = useMemo(
        () => throttle(handleAutocompleteChange, throttleTime)
    , []);

    // Stop the invocation of the throttled function after unmounting
    useEffect(() => {
        return () => {
            throttledHandleAutocompleteChange.cancel();
        };
    }, []);

    return (
        <Autocomplete 
            fullWidth
            multiple={false}
            filterOptions={(x) => x}
            options={options}
            getOptionLabel={(option) => option.name}
            onInputChange={throttledHandleAutocompleteChange}
            onChange={(option, value) => {if (value) handleValueChange(value._id)}}
            renderInput={(params) => {
                return (
                    <Card
                        raised
                        sx={{
                            bgcolor: 'transparent'
                        }}
                    >
                        <TextField 
                            {...params}
                            variant="outlined"
                            placeholder="Search for a specific patient..."
                            sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                },
                            }}
                            InputProps={{
                                ...params.InputProps,
                                fullWidth: true,
                                startAdornment: (
                                <FinniFox
                                    sx={{
                                        marginRight: '8px',
                                        marginLeft: '8px',
                                        color: 'gray',
                                        size: 'large',
                                    }}
                                />
                                ),
                                endAdornment: (
                                    <Fragment>
                                        {isLoading && <CircularProgress color="inherit" size={20} />}
                                    </Fragment>
                                )
                            }}
                        />
                    </Card>
                )
            }}
            renderOption={(props, option) => (
                <ListItem {...props} key={option.name} dense>
                    <FinniFox sx={{ mr: '1rem' }} />
                    <ListItemText 
                        primary={option.name}
                        primaryTypographyProps={{ variant: 'h6' }}
                    />
                </ListItem>
            )}
        />
    )
};

export default HomePageAutocomplete;