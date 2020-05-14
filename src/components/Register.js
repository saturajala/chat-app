    import React from 'react';
    import firebase from '../firebase.js';
    import { Link } from 'react-router-dom';
    import { Form, Button } from 'react-bootstrap'

    class Register extends React.Component {

        constructor(props){
            super(props);
            this.state = {
                username: '',
                email: '',
                password: '',
                error: null
            }
        }

        handleChange = e =>  {
            this.setState({[e.target.name]: e.target.value});
        }

        handleSubmit = e => {
            e.preventDefault();
            const {email, username, password, error} = this.state;
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {

                const user = firebase.auth().currentUser;
                user.updateProfile({displayName: username}).then(() => {
                    this.props.history.push('/');
                })
                .catch(error => {
                    this.setState({error});
                });
            })

            .catch(error => {
                this.setState({error});
            })

            //console.log("Submitting registration...");
        }

        render(){
            const {email, username, password, error} = this.state;
            return(
                <div className="auth-container container mt-5 login-div">
                    <h1>Register your account</h1>
                    {error && <p className="error-message">{error.message}</p>}

                    <Form onSubmit={this.handleSubmit} className="mt-3 pt-3">
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" id="username" value={username} onChange={this.handleChange} placeholder="Enter a username"></Form.Control>

                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" id="email" value={email} onChange={this.handleChange} placeholder="Enter email"></Form.Control>

                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" id="password" value={password} onChange={this.handleChange} placeholder="Enter a password"></Form.Control>

                        <Button variant="primary" type="submit" className="submit mt-4 login-and-register-btn">Get started!</Button>
                        <p className="pt-3">Already have an account? <Link className="login-btn" to="/login">Login here</Link>.</p>
                    </Form.Group>
                </Form>

                </div>
            );
        }

    }

export default Register;