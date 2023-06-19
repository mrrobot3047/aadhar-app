import React, { useState, useEffect,lazy, Suspense } from 'react';
import axios from 'axios';
import { Box,Typography,TextField,Button, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from './breakpoints';
import { useNavigate } from 'react-router-dom';

const Aadharviewcard = lazy(() => import('./Aadharviewcard'));
const useStyles= makeStyles(()=>({
    body:{
        width:'100%',
        height:'100vh',
        background: 'linear-gradient(to bottom, #ffc8dd, #1e90ff)',
    },
    mainContaner:{
        position:'absolute',
        top:'10%',
        left:'20%',
        border:'1px solid #cae9ff',
        background: 'linear-gradient(to bottom, #ffc8dd, #ada7ff)',
        boxShadow:'0 0 5px 2px #ffd6ff',
        borderRadius:'30px',
        padding:'40px 40px',
        alignItems:'center',
        [theme.breakpoints.down('sm')]:{
            left:'8%',
        }
    },
    formBox:{
        display:'flex',
        flexDirection:'column',
        width:'600px',
        gap:theme.spacing(2),
        [theme.breakpoints.down('sm')]:{
            width:'300px',
        }

    },
    logout:{
        position:'absolute',
        left:'40%',
    },
    heading:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:'20px',
        color:'#560bad',

    },
    Textbox:{
        display:'flex',
        flexDirection:'row',
        columnGap:theme.spacing(4),
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column',
            rowGap:theme.spacing(2),
        }
    },
    alertBox: {
        position: 'relative',
        backgroundColor: 'white',
        padding: '20px 30px',
        width:'200px',
        marginBottom: '20px',
        left:'-100%',
        top:'5%',
        borderRadius:'5px',
        animation:'$swipe 15s ease-in'
      },
      greenBar: {
        position:'absolute',
        top: 50,
        left: 0,
        height: '5%',
        width: '0%',
        backgroundColor: 'green',
        animation: '$slide 10s linear',
      },
      redbar: {
        position:'absolute',
        top: 50,
        left: 0,
        height: '5%',
        width: '0%',
        backgroundColor: 'red',
        animation: '$slide 10s linear',
      },
      adharbody:{
        position:'absolute',
        top:'10%',
        left:'25%',
        [theme.breakpoints.down('sm')]:{
          left:'10%'
      },
    },
      message:{
        display:'flex',
        fontSize:'2px',
        fontFamily:'Alumni Sans, sans-serif',
      },
      '@keyframes slide': {
        '0%': {
          width: '0%',
        },
        '100%': {
          width: '100%',
        },
      },
      '@keyframes swipe':{
        '0%':{
          left:'-100%',
        },
        '50%':{
          left:'30%'
        },
        '100%':{
          left:'-100%'
        }
      }
  
  }))

const AadharPage = ({ isAdmin,handleLogout }) => {
  const classes = useStyles()
  const [firstName, setFirstName] = useState('');
  const [lastName,setLastName] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [homeAddress,sethomeAddress] = useState('')
  const [aadharData, setAadharData] = useState({});
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!isAdmin) {
      // Fetch Aadhar data for normal user
      fetchAadharData();
    }
  }, [isAdmin]);

  const handleAadharCreation = async (e) => {
    e.preventDefault();
    setShowAlert(true)
    const aadharNumber = generateAadharNumber();
    const requestData = {firstName, lastName,phoneNumber,email,password,homeAddress, aadharNumber: aadharNumber };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://arun.test.ppm.wtf/aadhar', requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAadharData(response.data);
      setMessage('Aadhar created successfully.');
      await new Promise((resolve) => setTimeout(resolve, 20000));
      navigate('/')
    } catch (error) {
      setMessage('Failed to create Aadhar.');
      await new Promise((resolve) => setTimeout(resolve, 20000));
      navigate('/')
    }
  };

  const fetchAadharData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://arun.test.ppm.wtf/aadhar', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data)
      setAadharData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const generateAadharNumber = () => {
    // Generate a unique 12-digit Aadhar number
    return Math.floor(Math.random() * 1000000000000).toString();
  };

  if (isAdmin) {
    return (
      <Box  className={`${classes.body}`}>
        <Button variant="contained" color="error" onClick={handleLogout}  className={`${classes.logout}`}>Log Out</Button>
        <Container>
        <Box className={`${classes.mainContaner}`}>
            <Typography variant="h6"  className={`${classes.heading}`}>Create Aadhar</Typography>
            <Box component="form" className={`${classes.formBox}`} onSubmit={handleAadharCreation}>
                <Box className={`${classes.Textbox}`}>
                    <TextField label="First Name" variant="standard" value={firstName} onChange={(e) => setFirstName(e.target.value)} required color="primary" focused sx={{width:'700px',maxWidth:'100%'}}/>
                    <TextField label="Last Name" variant="standard" value={lastName} onChange={(e) => setLastName(e.target.value)} required color="primary" focused sx={{width:'700px',maxWidth:'100%'}}/>
                </Box>
                <Box  className={`${classes.Textbox}`}>
                    <TextField label="Phone number" variant="standard" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required color="primary" focused sx={{width:'700px',maxWidth:'100%'}}/>
                    <TextField label="Email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} required color="primary" focused sx={{width:'700px',maxWidth:'100%'}}/>
                </Box>
                <Box  className={`${classes.Textbox}`}>
                    <TextField label="Password" variant="standard" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required color="primary" focused sx={{width:'700px',maxWidth:'100%'}}/>
                    <TextField label="Address" variant="standard" value={homeAddress} onChange={(e) => sethomeAddress(e.target.value)} required color="primary" focused sx={{width:'700px',maxWidth:'100%'}}/>
                </Box>
                <Button variant="contained" color="primary" type="submit">Create New AadharCard</Button>
            </Box>

        </Box>

        </Container>
        { showAlert && (
        <Box className={classes.alertBox}>
          <Typography sx={{fontSize:'12px',fontFamily:"Open Sans, sans-serif"}}>{message}</Typography>

          <Box className={message === "Aadhar created successfully." ? classes.greenBar : classes.redbar } />
        </Box>
      )}
      </Box>
    );
  } else {
    return (
      <Box className={`${classes.body}`}>
          <Button variant="contained" color="error" onClick={handleLogout}  className={`${classes.logout}`}>Log Out</Button>
          <Box className={`${classes.adharbody}`}>
            <Typography variant="h6"  className={`${classes.heading}`}>Aadhar Details</Typography>
            <Suspense fallback={<div>Loading...</div>}>
              <Aadharviewcard aadharData={aadharData} />
            </Suspense>

          </Box>
      </Box>
    );
  }
};

export default AadharPage;
