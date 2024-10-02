import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Company, UserCompany } from '../models';
import { DataStore } from '@aws-amplify/datastore';
import CompanyDocumentManager  from './CompanyDocumentManager';

const UserComponent = ({ user }) => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [companies, setCompanies] = useState([]);
  const [joinedCompanies, setJoinedCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
    if (user) {
      fetchJoinedCompanies();
    }
  }, [user]);

  const fetchCompanies = async () => {
    try {
      const companyData = await DataStore.query(Company);
      setCompanies(companyData);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchJoinedCompanies = async () => {
    try {
      const userCompanyData = await DataStore.query(UserCompany, (uc) =>
        uc.userId.eq(user.userId)
      );
      const companyPromises = userCompanyData.map(async (uc) => {
        return DataStore.query(Company, uc.companyId);
      });

      const companies = await Promise.all(companyPromises);
      setJoinedCompanies(companies);
    } catch (error) {
      console.error('Error fetching joined companies:', error);
    }
  };

  const handleJoinCompany = async (e) => {
    e.preventDefault();
    console.log('User details:', user);  // Inspect user object
    try {
      // Query the company from DataStore
      const company = await DataStore.query(Company, selectedCompany);

      // Check if company exists and has a companyPassword field
      if (company && company.companyPassword === enteredPassword) {
        await DataStore.save(
          new UserCompany({
            userId: user.userId,  // Assuming you have the current user’s ID
            companyId: selectedCompany,
          })
        );
        console.log('User successfully assigned to company');
        fetchJoinedCompanies();  // Refresh the joined companies after success
      } else if (!company) {
        console.error('Company not found');
      } else {
        console.error('Invalid company password');
      }
    } catch (error) {
      console.error('Error joining company:', error);
    }
  };

  const deleteJoinedCompany = async (companyId) => {
    try {
      const userCompanyToDelete = await DataStore.query(UserCompany, (uc) => 
        uc.and(uc => [
          uc.userId.eq(user.userId),
          uc.companyId.eq(companyId)
        ])
      );
  
      if (userCompanyToDelete.length > 0) {
        await DataStore.delete(userCompanyToDelete[0]);
        console.log('Company unlinked successfully');
        fetchJoinedCompanies();
      } else {
        console.log('No matching company found to delete');
      }
    } catch (error) {
      console.error('Error deleting joined company:', error);
    }
  };

  return (
    <Typography variant="h5" gutterBottom>
      Regular user Dashboard:
      <form onSubmit={handleJoinCompany}>
        <select onChange={(e) => setSelectedCompany(e.target.value)}>
          <option value="">-- Select a Company --</option>
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
      <p>Companies You've Joined:</p>
      {joinedCompanies && joinedCompanies.length > 0 ? (
      <ul>
        {joinedCompanies.map((company) => (
          company && company.id && company.name && company.location ? ( // Add null checks for company and its properties
            <li key={company.id}>
              <strong>{company.name}</strong> - {company.location}
              <button
                onClick={() => deleteJoinedCompany(company.id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Remove
              </button>
              <CompanyDocumentManager companyId={company.id} />
            </li>
          ) : (
            <li key={Math.random()}>Invalid company data</li> // Fallback for invalid company data
          )
        ))}
      </ul>
    ) : (
      <p>You have not joined any companies yet.</p>
    )}
    </Typography>
  );
};

export default UserComponent;
