import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Clock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDateTime = currentDateTime.toLocaleString('en-US', options);

  const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const formattedTime = currentDateTime.toLocaleString('en-US', optionsTime);

  return (
    <Box display="flex">
      <Typography variant="h2" fontWeight="bold" color="white">
        {`${formattedDateTime} ${formattedTime}`}
      </Typography>
    </Box>
  );
};

export default Clock;