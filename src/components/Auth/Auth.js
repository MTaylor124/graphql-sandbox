import {useContext} from 'react'
import {GlobalContext} from './../../GlobalContext'

import AuthControl from './AuthControl'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

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
        auth
    } = useContext(GlobalContext)

    let authContent, submitFeedback, buttonCheck, footerContent

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
                        disabled={auth.submitting}
                            style={customStyle}
                            className={classes.root}
                            variant="outlined"
                            label="Email"
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
                            label="Confirm Password"
                            type='password'
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
                            auth.submitCredentials()
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
                            auth.submitCredentials()
                        }}>
                            {submitFeedback}
                    </Button>
                    {footerContent}
                </div>
            )
        }
    }
    return (
        <div className='d-section-container'>
            {authContent}
        </div>
    )
}