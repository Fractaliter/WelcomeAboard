import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, Select, MenuItem } from '@mui/material';

const CustomerDashboard = ({ companies }) => {
  const [description, setDescription] = useState('');
  const [tickets, setTickets] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to fetch existing tickets using the Lambda function
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://4ptlnqbqnae3yyist2vj3ubwtq0fygtv.lambda-url.eu-central-1.on.aws/', {  // Replace with your actual Function URL
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTickets(data);  // Assuming the Lambda function returns ticket data
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to submit a new ticket using Lambda
  const submitTicket = async () => {
    if (!selectedCompanyId) {
      alert("Please select a company.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://4ptlnqbqnae3yyist2vj3ubwtq0fygtv.lambda-url.eu-central-1.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description,
          status: 'Open', // Default status
          companyId: selectedCompanyId, // Associate ticket with selected company
        }),
      });
      const newTicket = await response.json();
      setTickets([...tickets, newTicket]);
      setDescription('');
    } catch (error) {
      console.error('Error submitting ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Customer Support Dashboard
      </Typography>

      <Box component="form" onSubmit={(e) => { e.preventDefault(); submitTicket(); }}>
        <Select
          value={selectedCompanyId}
          onChange={(e) => setSelectedCompanyId(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        >
          <MenuItem value="" disabled>
            Select a Company
          </MenuItem>
          {companies?.length > 0 && companies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Ticket Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Submit Ticket
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mt: 4 }}>Your Tickets</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (tickets?.length > 0 ? (
        <List>
          {tickets.map((ticket) => (
            <ListItem key={ticket.id}>
              <strong>{ticket.description}</strong> - Status: {ticket.status}
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No tickets found.</Typography>
      ))}
    </Box>
  );
};

export default CustomerDashboard;
