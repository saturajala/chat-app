import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import firebase, { auth, provider } from './firebase.js';
import { Navbar, Nav, Button, Form,
 } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AppRouter extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: null }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    })
  }

  logOutUser = () => {
    firebase.auth().signOut().then(window.location = "/");
  }

  render() {
    return (
      <Router>
        <div className="app">



            {!this.state.user &&
              <Navbar variant="dark" defaultActiveKey="/">
                <Navbar.Brand as={Link} to="/">Chat App</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </Nav>
              </Navbar>
            }
            {this.state.user &&
              /* <a href="#!" onClick={this.logOutUser}>Log Out</a> */
              <Navbar variant="dark">
                <Navbar.Brand as={Link} to="/">Chat App</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                  <Form><Button variant="outline-info" className="log-out-btn" onClick={this.logOutUser}>Log Out</Button></Form> 
              </Navbar>
            }

          <Switch>
            <Route path="/" exact render={() => <App user={this.state.user} />} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>

        </div>
      </Router>
    );
  }

}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
