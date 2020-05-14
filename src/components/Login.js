import React from 'react';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.props.history.push('/');
        })
            .catch(error => {
                this.setState({ error });
            })
    }

    render() {
        const { email, password, error } = this.state;
        return (
            <div className="auth-container container mt-5 login-div">
                <h1>Login</h1>
                <p className="pt-3">Login to access your account</p>
                {error && <p className="error-message">{error.message}</p>}
                <Form onSubmit={this.handleSubmit} className="mt-3">
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" id="email" value={email} onChange={this.handleChange} placeholder="Enter email"></Form.Control>

                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" id="password" value={password} onChange={this.handleChange} placeholder="Enter password"></Form.Control>

                        <Button variant="primary" type="submit" className="submit mt-4 login-and-register-btn">Login</Button>
                        <p className="pt-3">Don't have an account? <Link className="login-btn" to="/register">Register here</Link>.</p>
                    </Form.Group>
                </Form>
            </div>
        );
    }

}

export default Login;