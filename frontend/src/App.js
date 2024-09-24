import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Hub } from '@aws-amplify/core';  // Correct import for Hub in Amplify v6+
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { fetchAuthSession, signOut  } from 'aws-amplify/auth';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import { DataStore } from '@aws-amplify/datastore';
import { Company } from './models';
import awsconfig from './aws-exports';
import AdminComponent from './AdminComponent';
import UserComponent from './UserComponent';
import StorageComponent from './StorageComponent';
import CompanyDocumentManager  from './CompanyDocumentManager';
import CompanyAdminComponent  from './CompanyAdminComponent';

Amplify.configure(awsconfig);

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCompanyAdmin, setIsCompanyAdmin] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Fetch the user session
        const session = await fetchAuthSession(); 

        // Log the full session
        console.log('Full Auth Session:', session);

        // Check if the session has tokens and idToken
        if (session && session.tokens && session.tokens.idToken) {
          const idToken = session.tokens.idToken;
          console.log('Full ID Token:', idToken);
        
          // Log payload
          const payload = idToken.payload;
          console.log('ID Token Payload:', payload);
        
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

    // Call checkUser to verify the session when the component mounts
    checkUser();

    // Listen for Auth events using Amplify's Hub
    const listener = (data) => {
      const { event } = data.payload;
      if (event === 'signIn' || event === 'signOut') {
        // Recheck user session on sign in or sign out
        checkUser();
      }
    };

    // Register the Hub listener for auth events
    const removeListener = Hub.listen('auth', listener);

    // Clean up listener when the component unmounts
    return () => {
      removeListener();  // Properly clean up the listener using the return value
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '100%', maxWidth: 800, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to WelcomeAboard
            </Typography>
            <Authenticator>
              {({ signOut, user }) => (
                <Box>
                  {user ? (
                    <Box textAlign="center">
                      <Typography variant="h6" gutterBottom>
                        Hello, {user.userId}
                      </Typography>
                        {/* Render AdminComponent if user is an Admin or CompanyAdmin */}
                        {isAdmin && <AdminComponent user={user} />}

                        {/* Render CompanyAdminComponent and CompanyDocumentManager only if user is a CompanyAdmin */}
                        {isCompanyAdmin && (
                            <>
                            <h2> View Company Documents</h2>
                            {/* Dropdown to select the company if admin for multiple companies */}
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
                  
                            {/* Render CompanyAdminComponent and pass selected company ID */}
                            {selectedCompanyId && (
                              <>
                                <CompanyAdminComponent companyId={selectedCompanyId} />
                                <CompanyDocumentManager companyId={selectedCompanyId} />
                              </>
                            )}
                          </>
                        )}

                        
                        <UserComponent user={user} />
                        <StorageComponent />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={signOut}
                        sx={{ mt: 2 }}
                      >
                        Sign Out
                      </Button>
                    </Box>
                  ) : (
                    <Typography>Please sign in</Typography>
                  )}
                </Box>
              )}
            </Authenticator>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default App;
