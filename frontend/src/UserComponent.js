import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Company,UserCompany } from './models';
import { DataStore } from '@aws-amplify/datastore';

const UserComponent = ({ user }) => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
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
  const handleJoinCompany = async (e) => {
    e.preventDefault();
    try {
      const company = await DataStore.query(Company, selectedCompany);
      if (company.companyPassword === enteredPassword) {
        await DataStore.save(
          new UserCompany({
            userId: user.id, // Assuming you have the current user’s ID
            companyId: selectedCompany,
          })
        );
        console.log('User successfully assigned to company');
      } else {
        console.error('Invalid company password');
      }
    } catch (error) {
      console.error('Error joining company:', error);
    }
  };
    return (
      <Typography variant="h5" gutterBottom>
        User Dashboard: Welcome, regular user.
        <form onSubmit={handleJoinCompany}>
          <select onChange={(e) => setSelectedCompany(e.target.value)}>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          <TextField
            label="Company Password"
            type="password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            required
          />
          <Button type="submit">Join Company</Button>
        </form>
      </Typography>
    );
};

export default UserComponent;
