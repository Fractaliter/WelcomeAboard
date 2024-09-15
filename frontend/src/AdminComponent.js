import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const AdminComponent = () => {
  // State for managing companies
  const [companies, setCompanies] = useState([]);
  const [companyID, setCompanyID] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [companyFoundedYear, setCompanyFoundedYear] = useState('');

  // Fetch all companies (GET request)
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('/company/all');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  // Create a new company (POST request)
  const createCompany = async () => {
    try {
      const newCompany = {
        companyID: parseInt(companyID),  // Convert to number here
        name: companyName,
        location: companyLocation,
        industry: companyIndustry,
        foundedYear: companyFoundedYear
      };
      await axios.post('/company', newCompany);
      fetchCompanies(); // Refresh the company list
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  // Update an existing company (PUT request)
  const updateCompany = async (id) => {
    try {
      const updatedCompany = {
        name: companyName,
        location: companyLocation,
        industry: companyIndustry,
        foundedYear: companyFoundedYear
      };
      await axios.put(`/company/${id}`, updatedCompany);
      fetchCompanies(); // Refresh the company list
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  // Delete a company (DELETE request)
  const deleteCompany = async (id) => {
    try {
      await axios.delete(`/company/${id}`);
      fetchCompanies(); // Refresh the company list
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div>
      <h1>Admin Panel - Manage Companies</h1>

      <Box component="form" onSubmit={(e) => { e.preventDefault(); createCompany(); }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6">Create/Update Company</Typography>

        <TextField
          label="Company ID"
          variant="outlined"
          value={companyID}
          onChange={(e) => setCompanyID(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Company Name"
          variant="outlined"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Location"
          variant="outlined"
          value={companyLocation}
          onChange={(e) => setCompanyLocation(e.target.value)}
          fullWidth
        />

        <TextField
          label="Industry"
          variant="outlined"
          value={companyIndustry}
          onChange={(e) => setCompanyIndustry(e.target.value)}
          fullWidth
        />

        <TextField
          label="Founded Year"
          variant="outlined"
          value={companyFoundedYear}
          onChange={(e) => setCompanyFoundedYear(e.target.value)}
          fullWidth
        />

        <Button variant="contained" color="primary" type="submit">
          Create/Update Company
        </Button>
      </Box>

      {/* List of companies */}
      <h2>Company List</h2>
      <ul>
        {companies.map((company) => (
          <li key={company.companyID}>
            {company.name} - {company.location} - {company.industry} - Founded: {company.foundedYear}
            <button onClick={() => updateCompany(company.companyID)}>Update</button>
            <button onClick={() => deleteCompany(company.companyID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComponent;
