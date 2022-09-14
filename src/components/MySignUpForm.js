import React from 'react';
import { faCoffee, faGoogle, faSwimmingPool } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import app from '../firebase.init';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const auth = getAuth(app);

const MySignUpForm = () => {
    //All use state in there
    const [validated, setValidated] = useState(false);
    const [register, setRegister] = useState(true);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState('');

    //Handle Email Change
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    //Handle Password Change
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    //Handle User Name
    const handleUserName = (event) => {
        setName(event.target.value)
    }

    //Already Register
    const handleRegisterChange = (event) => {
        setRegister(event.target.checked)
    }

    //Handle sign up with email
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        //Password Validator
        if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            setError('Please type at least one special character!');
            return;
        }
        setValidated(true);
        setError('');

        if (register) {
            //Are you already user
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setUser(user);
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(errorMessage)
                });
        }
        else {
            //Creating a new User
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    setEmail('');
                    setPassword('');
                    verifyEmail();
                    setDisplayName();

                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage)

                });
        }
    };

    //Send new user a verification email
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('email sent')
            });
    }

    //Set user name
    const setDisplayName = () => {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: "https://lh3.googleusercontent.com/a/AItbvmmrbrFPg_qF21iMAOG4tciz9uaxdFDQnh3VLhIT=s360-p-rw-no"
        }).then(() => {
            console.log('user name created')
        }).catch((error) => {

        });
    }

    //Send a password reset email
    const passwordResetEmail = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('password reset mail is sent')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    //Handle signup with Google:
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user)

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    //Sign in With Github
    const gitHubProvider = new GithubAuthProvider();
    const signInWithGitHub = () => {
        signInWithPopup(auth, gitHubProvider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                setUser(user)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    return (
        <div>
            <div className='w-25 mx-auto bg-light'>
                <h1 className='p-2 text-center mt-3 text-primary'>{register ? 'Please Login on your account' : 'Sign up with Email'} </h1>
                <div className='p-2 w-100 mx-auto'>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            {!register && <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onBlur={handleUserName}
                                    placeholder="First name"
                                    defaultValue=""
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>}


                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom03">
                                <Form.Label>Email</Form.Label>
                                <Form.Control onBlur={handleEmailChange} type="email" placeholder="email" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationCustom04">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onBlur={handlePasswordChange} type="password" placeholder="password" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid password.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        {register ? <div><Form.Group className="mb-3">
                            <Form.Check
                                onChange={handleRegisterChange}
                                required
                                label="Do Not Have Account?"
                            />
                        </Form.Group></div> : <div><Form.Group className="mb-3">
                            <Form.Check
                                onChange={handleRegisterChange}
                                required
                                label="Do You Have Account?"
                            />
                        </Form.Group></div>}
                        <p className='text-danger'>{error}</p>
                        <Button onClick={passwordResetEmail} variant='link'>Forget Password ?</Button>
                        <Button className='w-50' type="submit">{!register ? 'Log In' : 'Sign Up'}</Button>
                        <div className='w-50'>

                            <img onClick={signInWithGoogle} className='w-25' src={'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'} alt="" />
                            <img onClick={signInWithGitHub} className='ms-3 w-25' src={'https://cdn-icons-png.flaticon.com/512/25/25231.png'} alt="" />
                        </div>
                    </Form>
                </div>
            </div>
                <p>Name: {user.displayName}</p>
                <img className='rounded rounded-full' src={user.photoURL} alt="" />
        </div>

    );
};

export default MySignUpForm;