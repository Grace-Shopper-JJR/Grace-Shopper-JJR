import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import {
    Navbar,
    Menu,
    ProductCard,
    ProductPage,
    Login,
    Register
} from './components/index';

const App = () => {

    const useStyles = makeStyles({
        root: {
          flexGrow: 1,
          maxWidth: 1500,
        },
      });
      
    const classes = useStyles();

    const [merchandise, setMerchandise] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userToken, setUserToken] = useState('');
    const [loggedIn, setLoggedIn] = useState('');


    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
                <Router className={classes.root}>
                    <div className="app" 
                    style={{ padding: '20px'   
                    }}
                    >
                <Navbar/>
                    <Route exact path="/register">
                        <Register 
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                            userToken={userToken}
                            setUserToken={setUserToken}
                            setLoggedIn={setLoggedIn}
                            loggedIn={loggedIn}
                            // history
                        />
                    </Route>
                    <Route exact path="/merchandise">
                        <ProductPage
                            merchandise={merchandise}
                            setMerchandise={setMerchandise}
                        />
                    </Route>
                    <Route exact path="/login">
                        <Login 

                        />
                    </Route>
                    </div>
                </Router>
            </CssBaseline>
        </MuiThemeProvider>

    )


}

export default App;