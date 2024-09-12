import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { Container, Typography, Box, Card, CardContent, TextField } from '@mui/material';
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
                    <Box>
                      <Typography variant="body1" gutterBottom>
                        Please sign in to continue.
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          label="Email"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                        />
                        <TextField
                          label="Password"
                          type="password"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{ mt: 2 }}
                        >
                          Sign In
                        </Button>
                      </Box>
                    </Box>
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
