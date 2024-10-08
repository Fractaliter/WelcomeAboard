import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { fetchAuthSession,getCurrentUser } from 'aws-amplify/auth';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import { DataStore } from '@aws-amplify/datastore';
import { Company } from './models';
import awsconfig from './aws-exports';
import AdminComponent from './components/AdminComponent';
import UserComponent from './components/UserComponent';
import StorageComponent from './components/StorageComponent';
import CompanyDocumentManager  from './components/CompanyDocumentManager';
import CompanyAdminComponent  from './components/CompanyAdminComponent';
import CustomerDashboard  from './components/CustomerDashboard';

import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

function App() { 
  const [activePortal, setActivePortal] = useState('customer');  // Default to Customer Dashboard
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCompanyAdmin, setIsCompanyAdmin] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [authUser, setAuthUser] = useState(null); // Track the signed-in user

  const checkUser = async () => {
    try {
      // Fetch the user session
      const session = await fetchAuthSession(); 
      setAuthUser(await getCurrentUser()); // Set the user in state
      console.log('Current User', authUser);
      // Log the full session
      console.log('Full Auth Session:', session);

      // Check if the session has tokens and idToken
      if (session && session.tokens && session.tokens.idToken) {
        const idToken = session.tokens.idToken;

        const payload = idToken.payload;
        // Fetch user groups from the payload
        const userGroups = payload["cognito:groups"] || [];
        console.log('User Groups:', userGroups);

        // Check if the user belongs to Admin group
        setIsAdmin(userGroups.includes('Admin'));

        // Check if the user belongs to CompanyAdmin group
        setIsCompanyAdmin(userGroups.includes('CompanyAdmin'));

        if (userGroups.includes('CompanyAdmin')) {
          // Fetch companies the user is an admin for
          const companyData = await DataStore.query(Company);
          setCompanies(companyData);
          // Automatically select the first company if there's only one
          if (companyData.length === 1) {
            setSelectedCompanyId(companyData[0].id);
          }
        }
      } else {
        console.log('User is not signed in or session is missing.');
      }
    } catch (error) {
      console.log('Error retrieving user session:', error);
    }
  };
  useEffect(() => {
    // Call checkUser to verify the session when the component mounts
    checkUser();

  }, []);
  
  const renderPortalContent = (user) => {
    if (activePortal === 'customer') {
      return <CustomerDashboard />;
    } else if (activePortal === 'company') {
      return (
        <>
          <UserComponent user={user} />
          <hr />
          <h2> View Company Documents</h2>
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
          >
            <option value="">-- Select a Company --</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          {selectedCompanyId && (
            <>
              <hr />
              <CompanyAdminComponent companyId={selectedCompanyId} />
              <CompanyDocumentManager companyId={selectedCompanyId} />
              <hr />
            </>
          )}
          <StorageComponent />
          <hr />
        </>
      )
    }else if (activePortal === 'admin') {
      return (
        <AdminComponent user={user} />
      );}
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '100%', maxWidth: 800, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              WelcomeAboard
            </Typography>

            <Authenticator>
              {({ signOut, user }) => {
                if (user && !authUser) {
                  // Call checkUser after sign-in
                  checkUser();
                }

                return (
                  <Box>
                    {user ? (
                      <Box textAlign="center">
                        <Typography variant="h6" gutterBottom>
                         Hello, {user?.signInDetails?.loginId || 'User'}
                        </Typography>

                        {/* Menu for Portal Selection */}
                        <Box sx={{ my: 2 }}>
                          <Button
                            variant={activePortal === 'customer' ? 'contained' : 'outlined'}
                            onClick={() => setActivePortal('customer')}
                            sx={{ mr: 2 }}
                          >
                            Customer Dashboard
                          </Button>
                          <Button
                            variant={activePortal === 'company' ? 'contained' : 'outlined'}
                            onClick={() => setActivePortal('company')}
                          >
                            Company Document Manager
                          </Button>
                          {isAdmin && (
                            <Button
                              variant={activePortal === 'admin' ? 'contained' : 'outlined'}
                              onClick={() => setActivePortal('admin')}
                            >
                              Admin
                            </Button>
                          )}
                        </Box>

                        {/* Render content based on the active portal */}
                        {renderPortalContent(user, isAdmin, isCompanyAdmin)}

                        <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          signOut();
                          checkUser();
                        }}
                        sx={{ mt: 2 }}
                      >
                        Sign Out
                      </Button>
                      </Box>
                    ) : (
                      <Typography>Please sign in</Typography>
                    )}
                  </Box>
                );
              }}
            </Authenticator>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}


export default App;
