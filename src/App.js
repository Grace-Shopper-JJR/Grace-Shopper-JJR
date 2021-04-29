import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import {
    Menu,
    ProductCard,
    ProductPage,
    Login,
    Register
} from './components/index';

const App = () => {

    const [merchandise, setMerchandise] = useState([]);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Router>
                <Menu/>
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
                </Router>
            </CssBaseline>
        </ThemeProvider>

    )


}

export default App;