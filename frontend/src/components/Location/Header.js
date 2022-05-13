import React, {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import logo from '../images/logo.png';
import logout from '../images/logout.png';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
    color : '#e7a164'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    color: '#e7a164',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
      
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFF'
  },
  inputRoot: {
    color: '#FFFFF',
    
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '20ch' },
    
    backgroundColor: '#FFFFF'
    
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF'
    
  },
}));

export default function Header({setCoords}) {
  const classes = useStyles();
  const [ autocomplete, setAutocomplete] = useState(null);
  const onLoad = (autoC) =>  setAutocomplete(autoC);

  const signOut = () => { 
    window.localStorage.setItem('isChatSelected', JSON.stringify(false));
    window.localStorage.setItem('activeChat', "{}");
    sessionStorage.clear();
    window.location.reload(false);
    window.location.replace("http://localhost:3000/")
}
  
 
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoords({lat,lng})
  }
  return (
    <AppBar position='static' >
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title}><img className = "logo" src={logo} alt="Logo" /> </Typography>
        <Box display='flex'>
          <Typography className={classes.title}>
            Explore new places
          </Typography><img className = "settingsIcon" src={logout} onClick = {() => signOut()}/>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
            
          </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
