import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const CustomerDashboard = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Customer Dashboard
      </Typography>
      {/* Form to create a new support ticket */}
      <Box>
        <Typography variant="h6">Create a New Support Ticket</Typography>
        {/* Placeholder form for creating tickets */}
        <Button variant="contained" color="primary">
          Create Ticket
        </Button>
      </Box>

      {/* List of existing tickets */}
      <Box mt={4}>
        <Typography variant="h6">Your Support Tickets</Typography>
        {/* Placeholder for ticket list */}
        <Typography>No tickets found.</Typography>
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
