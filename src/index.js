import React from 'react'; // this enables jsx
import ReactDOM from '...react-dom'; // this allows us to attach the APP
import App from './App'

  

ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('App')
)