import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';  // Correct import
import { Company } from './models'; // Ensure path is correct for your models
import { TextField, Button, Box, Typography } from '@mui/material';

const AdminComponent = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [companyFoundedYear, setCompanyFoundedYear] = useState('');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const companyData = await DataStore.query(Company);
      setCompanies(companyData);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const createCompany = async (e) => {
    e.preventDefault();
    try {
      await DataStore.save(
        new Company({
          name: companyName,
          location: companyLocation,
          industry: companyIndustry,
          foundedYear: companyFoundedYear,
        })
      );
      fetchCompanies();
      clearForm();
    } catch (error) {
      console.error('Error creating/updating company:', error);
    }
  };

  const updateCompany = async (companyName) => {
    try {
      const original = await DataStore.query(Company, companyName);
      if (original) {
        await DataStore.save(
          Company.copyOf(original, updated => {
            updated.name = companyName;
            updated.location = companyLocation;
            updated.industry = companyIndustry;
            updated.foundedYear = companyFoundedYear;
          })
        );
        fetchCompanies();
        clearForm();
      }
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const deleteCompany = async (companyName) => {
    try {
      const companyToDelete = await DataStore.query(Company, companyName);
      await DataStore.delete(companyToDelete);
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const clearForm = () => {
    setCompanyName('');
    setCompanyLocation('');
    setCompanyIndustry('');
    setCompanyFoundedYear('');
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4">Admin Panel - Manage Companies</Typography>
      <Box component="form" onSubmit={createCompany} sx={{ mt: 2 }}>
        <TextField
          label="Company Name"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Location"
          type="text"
          value={companyLocation}
          onChange={(e) => setCompanyLocation(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Industry"
          type="text"
          value={companyIndustry}
          onChange={(e) => setCompanyIndustry(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Founded Year"
          type="text"
          value={companyFoundedYear}
          onChange={(e) => setCompanyFoundedYear(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create/Update Company
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Existing Companies</Typography>
        {companies.map((company) => (
          <Box key={company.id} sx={{ mt: 2, border: '1px solid #ccc', padding: '10px' }}>
            <Typography variant="h6">{company.name}</Typography>
            <Typography>Location: {company.location}</Typography>
            <Typography>Industry: {company.industry}</Typography>
            <Typography>Founded Year: {company.foundedYear}</Typography>
            <Button
              onClick={() => updateCompany(company.name)}
              variant="contained"
              color="secondary"
              sx={{ mr: 2, mt: 2 }}
            >
              Update
            </Button>
            <Button
              onClick={() => deleteCompany(company.name)}
              variant="outlined"
              color="error"
              sx={{ mt: 2 }}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AdminComponent;
