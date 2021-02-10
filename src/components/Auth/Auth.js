import {useContext} from 'react'
import {GlobalContext} from './../../GlobalContext'

import AuthControl from './AuthControl'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
export default function Auth() {
    const useStyles = makeStyles({
        root: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0,0)"
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0,0)",
                backgroundColor: 'rgba(0,0,0,0.04)',
                borderRadius: '0'
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0,0)",
                backgroundColor: 'rgba(0,0,0,0.13)',
                borderRadius: '0'
            },
            "& .MuiOutlinedInput-input": {
                color: "white"
            },
            "&:hover .MuiOutlinedInput-input": {
                color: "white"
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                color: "white"
            },
            "& .MuiInputLabel-outlined": {
                color: "white"
            },
            "&:hover .MuiInputLabel-outlined": {
                color: "white"
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
                color: "white"
            }
        }
    })

    let {
        auth,
        notification,
        user
    } = useContext(GlobalContext)

    let authContent, submitFeedback, buttonCheck, footerContent, emailCheck, passCheck, confirmCheck

    const classes = useStyles();

    const customStyle = {
        marginBottom: '20px',
        width: '420px'
    }
    const switchStyle = {
        padding: '3px',
        textTransform: 'none',
        fontWeight: '600',
        color: 'white',
        fontSize: '0.9rem',
        marginLeft: '8px'
    }
    const feedbackStyle = {
        color: 'white'
    }
    if (auth.form.password !== null) {
        passCheck = auth.form.password
    } else {
        passCheck = ''
    }
    if (auth.form.email  !== null) {
        emailCheck = auth.form.email
    } else {
        emailCheck = ''
    }
    if (auth.form.confirm  !== null) {
        confirmCheck = auth.form.confirm
    } else {
        confirmCheck = ''
    }
    if (auth.submitting) {
        buttonCheck = 'rgba(0,0,0,0)'
        footerContent = ''
    } else {
        buttonCheck = 'rgba(0,0,0,0.04)'
        if (auth.signUp) {
            footerContent = (
                <div className="d-auth-form-footer myfont2">
                    Already have an account? 
                    <Button
                        disabled={auth.submitting}
                        style={switchStyle}
                        onClick={() => auth.toggleSignUp()}>
                        Sign in!
                    </Button>
                </div>
            )
        } else {
            footerContent = (
                <div className="d-auth-form-footer myfont2">
                    Don't have an account? 
                    <Button
                        disabled={auth.submitting}
                        style={switchStyle}
                        onClick={() => auth.toggleSignUp()}>
                        Sign up now!
                    </Button>
                </div>
            )
        }
    }
    const submitButton = {
        textTransform: 'none',
        marginTop: '15px',
        height: '50px',
        width: '140px',
        border: 'none',
        fontSize: '1.8rem',
        backgroundColor: buttonCheck,
        padding: '0',
        fontFamily: 'Helvetica'
    }

    if (auth.submitting) {
        submitFeedback = (
            <CircularProgress 
                style={feedbackStyle}
                size={30}
            />
        )
    } else {
        if (auth.signUp) {
            submitFeedback = 'Sign Up!'
        } else {
            submitFeedback = 'Sign In!'
        }
    }

    if (auth.loggedIn) {
        authContent = <AuthControl />
    } else {
        if (auth.signUp) {
            authContent = (
                <div className='d-auth-form-container'>
                    <TextField
                        error={auth.form.showEmailError}
                        helperText={auth.form.emailError}
                        disabled={auth.submitting}
                        style={customStyle}
                        className={classes.root}
                        variant="outlined"
                        label="Email"
                        value={emailCheck}
                        onChange={(e) => auth.form.setValue('email', e.target.value)}
                        InputProps={{
                            style: {fontSize: '1.8rem'},
                            classes: {
                                root: classes.root,
                                focused: classes.focused,
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                    />
                    <TextField
                        error={auth.form.showPasswordError}
                        helperText={auth.form.passwordError}
                        disabled={auth.submitting}
                        style={customStyle}
                        className={classes.root}
                        variant="outlined"
                        label="Password"
                        type='password'
                        value={passCheck}
                        onChange={(e) => auth.form.setValue('password', e.target.value)}
                        InputProps={{
                            style: {fontSize: '1.8rem'},
                            classes: {
                                root: classes.root,
                                focused: classes.focused,
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                    />
                    <TextField
                        error={auth.form.showConfirmError}
                        helperText={auth.form.confirmError}
                        disabled={auth.submitting}
                        style={customStyle}
                        className={classes.root}
                        variant="outlined"
                        label="Confirm Password"
                        type='password'
                        value={confirmCheck}
                        onChange={(e) => auth.form.setValue('confirm', e.target.value)}
                        InputProps={{
                            style: {fontSize: '1.8rem'},
                            classes: {
                                root: classes.root,
                                focused: classes.focused,
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                    />
                    <Button
                        disabled={auth.submitting}
                        color='secondary'
                        variant='outlined'
                        style={submitButton}
                        onClick={() => {
                            handleSignUp()
                            // auth.submitCredentials('Signed up')
                        }}>
                            {submitFeedback}
                    </Button>
                    {footerContent}
                </div>
            )
        } else {
            authContent = (
                <div className='d-auth-form-container'>
                    <TextField
                        disabled={auth.submitting}
                        style={customStyle}
                        className={classes.root}
                        variant="outlined"
                        label="Email"
                        value={emailCheck}
                        onChange={(e) => auth.form.setValue('email', e.target.value)}
                        InputProps={{
                            style: {fontSize: '1.8rem'},
                            classes: {
                                root: classes.root,
                                focused: classes.focused,
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                    />
                    <TextField
                        disabled={auth.submitting}
                        style={customStyle}
                        className={classes.root}
                        variant="outlined"
                        label="Password"
                        type='password'
                        value={passCheck}
                        onChange={(e) => auth.form.setValue('password', e.target.value)}
                        InputProps={{
                            style: {fontSize: '1.8rem'},
                            classes: {
                                root: classes.root,
                                focused: classes.focused,
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                    />
                    <Button
                        disabled={auth.submitting}
                        color='secondary'
                        variant='outlined'
                        style={submitButton}
                        onClick={() => {
                            auth.submitCredentials('Signed in')
                        }}>
                            {submitFeedback}
                    </Button>
                    {footerContent}
                </div>
            )
        }
    }
    function handleSignUp() {
        auth.form.clearErrors()
        if (!auth.form.email) {
            auth.form.setError('email', 'Email must not be blank')
        } else if (!auth.form.password) {
            auth.form.setError('password', 'Password must not be blank')
        } else if (!auth.form.confirm) {
            auth.form.setError('confirm', 'Confirm Password must not be blank')
        } else if (auth.form.password !== auth.form.confirm) {
            auth.form.setError('confirm', 'Passwords must match')
        } else {
            auth.submitCredentials()
            firebase.auth().createUserWithEmailAndPassword(auth.form.email, auth.form.password)
            .then(userCreds => {
                // Fade out and show notification or maybe not cuz i already have feedback
                // clear all values of anything that will not be used again
                notification.showNotification('Signed up Successfully!')
                auth.endSubmitting()
                user.setuid(userCreds.user.uid)

                let today = new Date()
                let day = today.getDate().toString()
                let month = (today.getMonth() + 1).toString()
                let year = today.getFullYear().toString()
                let todaysDate = month.concat('-',day,'-',year)

                firebase.firestore().collection('users')
                .add({
                    userID: userCreds.user.uid,
                    joined: todaysDate
                })
                .then(docRef => {
                    user.setdocRef(docRef.id)
                })
                .catch(err => {
                    console.error(err.code)
                    notification.showNotification(`An error occurred: ${err.message}`)
                })
            })
            // make database entry in users to save user data
            .catch(err => {
                auth.endSubmitting()
                if (err.code === 'auth/invalid-email') {
                    auth.form.setError('email', err.message)
                } else if (err.code === 'auth/weak-password') {
                    auth.form.setError('password', err.message)
                } else if (err.code === 'auth/email-already-in-use') {
                    auth.form.setError('email', err.message)
                } else {
                    notification.showNotification(`An error occurred: ${err.message}`)
                }
            })

        }
    }
    return (
        <div className='d-section-container'>
            {authContent}
        </div>
    )
}