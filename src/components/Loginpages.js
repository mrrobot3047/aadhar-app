import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from './breakpoints';

const useStyles = makeStyles(() => ({
  body: {
    width: '100%',
    height: '100vh',
    background: 'linear-gradient(to bottom, #ffc8dd, #1e90ff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContaner: {
    position: 'absolute',
    border: '1px solid blue',
    background: 'linear-gradient(to bottom, #ffc8dd, #ada7ff)',
    borderRadius: '30px',
    padding: '70px 40px',
    width: '400px',
    left:'30%',
    top:'20%',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      left:'10%',
    },
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
  },
  heading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20px',
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
}));

const Loginpages = ({ handleLogin }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await handleLogin(email, password);
    navigate('/aadhar');
  };

  return (
    <>
      <Box className={`${classes.body}`}>
        <Container>
          {isLoading ? (
            <Box className={`${classes.progressContainer}`}>
              <CircularProgress size={60} color="primary" />
            </Box>
          ) : (
            <Box className={`${classes.mainContaner}`}>
              <Typography variant="h6" className={`${classes.heading}`}>
                Login Form
              </Typography>
              <Box component="form" className={`${classes.formBox}`} onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  color="primary"
                  focused
                />
                <TextField
                  label="Password"
                  variant="standard"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  color="primary"
                  focused
                />
                <Button variant="contained" color="primary" type="submit">
                  Login
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Loginpages;
