import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { Container, Typography, Box } from '@mui/material';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already signed in
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await Amplify.Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      console.log('User is not signed in', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Authenticator>
            {({ signOut, user }) => (
              <div>
                <h1>Welcome to WelcomeAboard</h1>
                {user ? (
                  <div>
                    <h2>Hello, {user.username}</h2>
                    <Button onClick={signOut}>Sign Out</Button>
                  </div>
                ) : (
                  <div>Please sign in</div>
                )}
              </div>
            )}
        </Authenticator>
      </Box>
    </Container>
  );
}

export default App;
