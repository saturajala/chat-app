import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import firebase, { auth, provider } from './firebase.js';
import {
  Navbar, Nav, Button, Form, Container
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
            <Navbar collapseOnSelect expand="lg" variant="dark" defaultActiveKey="/">
              <Navbar.Brand as={Link} to="/">Chat App</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          }

          {this.state.user &&
            <Navbar collapseOnSelect expand="lg" variant="dark">
              <Navbar.Brand as={Link} to="/">Chat App</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Form><Button variant="outline-info" className="log-out-btn" onClick={this.logOutUser}>Log Out</Button></Form>
              </Navbar.Collapse>
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
