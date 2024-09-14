import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth'; // Correct method for Amplify v6
import { fetchAuthSession } from 'aws-amplify/auth';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import awsconfig from './aws-exports';
import AdminComponent from './AdminComponent';
import UserComponent from './UserComponent';

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState(null);
  const [userGroup, setUserGroup] = useState(null);  // For user group (role)

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // Fetch the user session
      const session = await fetchAuthSession(); 
  
      // Log the full session
      console.log('Full Auth Session:', session);
  
      // Check if the session has tokens and idToken
      if (session && session.tokens && session.tokens.idToken) {
        const idToken = session.tokens.idToken.jwtToken;
        console.log('ID Token:', idToken);
  
        // Set the user
        setUser(session);
  
        // Fetch user groups from the ID token payload
        const userGroups = session.tokens.idToken.payload["cognito:groups"];
        console.log('User Groups:', userGroups);
  
        // Set user group based on token information
        if (userGroups && userGroups.includes('Admin')) {
          setUserGroup('Admin');
        } else {
          setUserGroup('User');
        }
      } else {
        console.log('User is not signed in or session is missing.');
      }
    } catch (error) {
      console.log('Error retrieving user session:', error);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 3 }}>
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
                        Hello, {user.username}
                      </Typography>
                      {/* Conditional rendering based on user role */}
                      {userGroup === 'Admin' ? (
                        <AdminComponent />
                      ) : (
                        <UserComponent />
                      )}
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
