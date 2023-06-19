import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { red } from '@mui/material/colors';
import { Box, InputLabel } from '@mui/material';
import theme from './breakpoints';

const useStyles= makeStyles(()=>({
    card:{
        width:'500px',
        [theme.breakpoints.down('sm')]:{
            width:'400px',
        }
    },
    parentBox:{
        display:'flex',
        flexDirection:'column',
        rowGap:theme.spacing(4),
    },
    childBox:{
        display:'flex',
        flexDirection:"row",
        gap:theme.spacing(2)
    },
    typography:{
        fontSize:'10px',
        color:'#219ebc'
    }

  
  }))

const Aadharviewcard= ({aadharData})=>{
    const classes = useStyles()
  return (
    <Card  className={`${classes.card}`}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar>
        }
        title={aadharData.firstName}
        subheader="September 14, 2016"
      />
      <CardContent className={`${classes.parentBox}`}>
        <Box className={`${classes.childBox}`}>
            <Typography  className={`${classes.typography}`}>First Name -</Typography>
            <Typography  className={`${classes.typography}`}>
                {aadharData.firstName}
            </Typography>

        </Box>
        <Box className={`${classes.childBox}`}>
        <Typography  className={`${classes.typography}`}>Last Name -</Typography>
            <Typography  className={`${classes.typography}`}>
                {aadharData.lastName}
            </Typography>

        </Box>
        <Box className={`${classes.childBox}`}>
        <Typography className={`${classes.typography}`}>Aadhar Number -</Typography>
            <Typography  className={`${classes.typography}`}>
                {aadharData.aadharNumber}
            </Typography>
        </Box>
        <Box className={`${classes.childBox}`}>
        <Typography  className={`${classes.typography}`}>Phone Number -</Typography>
            <Typography  className={`${classes.typography}`}>
                {aadharData.phoneNumber}
            </Typography>

        </Box>
        <Box className={`${classes.childBox}`}>
        <Typography  className={`${classes.typography}`}>Email -</Typography>
            <Typography  className={`${classes.typography}`}>
                {aadharData.email}
            </Typography>
        </Box>
        <Box className={`${classes.childBox}`}>
        <Typography className={`${classes.typography}`}>Home Address -</Typography>
            <Typography  className={`${classes.typography}`}>
                {aadharData.homeAddress}
            </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
export default Aadharviewcard
