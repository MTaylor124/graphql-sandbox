import {useContext} from 'react'
import {GlobalContext} from './../../GlobalContext'

import AuthControl from './AuthControl'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function Auth() {

    const textFieldStyle = {
        width: '220px',
        marginBottom: '20px'
    }
    const submitButton = {
        textTransform: 'none',
        marginTop: '15px'
    }
    const switchStyle = {
        padding: '3px',
        textTransform: 'none',
        fontWeight: '600',
        color: 'white',
        fontSize: '0.9rem',
        marginLeft: '8px'
    }

    let {
        auth
    } = useContext(GlobalContext)

    let authContent

    if (auth.loggedIn) {
        authContent = <AuthControl />
    } else {
        if (auth.signUp) {
            authContent = (
                <div className='d-auth-form-container'>
                    <div className="d-auth-form-header myfont1">
                        Sign Up
                    </div>
                    <TextField
                        style={textFieldStyle}
                        color='secondary'
                        label='Email'
                        InputLabelProps={{color: 'secondary'}}
                        inputProps={{color: 'secondary'}}
                        />
                    <TextField
                        style={textFieldStyle}
                        color='secondary'
                        label='Password'
                        type='password'
                        />
                    <TextField
                        style={textFieldStyle}
                        color='secondary'
                        label='Confirm Password'
                        type='password'
                        />
                    <Button
                        color='secondary'
                        variant='outlined'
                        style={submitButton}>
                            Sign Up
                    </Button>
                    <div className="d-auth-form-footer myfont2">
                        Already have an account? 
                        <Button
                            style={switchStyle}
                            onClick={() => auth.toggleSignUp()}>
                            Sign in!
                        </Button>
                    </div>
                </div>
            )
        } else {
            authContent = (
                <div className='d-auth-form-container'>
                    <div className="d-auth-form-header myfont1">
                        Welcome Back
                    </div>
                    <TextField
                        style={textFieldStyle}
                        color='secondary'
                        label='Email'
                        InputLabelProps={{color: 'secondary'}}
                        inputProps={{color: 'secondary'}}
                        />
                    <TextField
                        style={textFieldStyle}
                        color='primary'
                        label='Password'
                        type='password'
                        />
                    <Button
                        color='secondary'
                        variant='outlined'
                        style={submitButton}>
                            Log in
                    </Button>
                    <div className="d-auth-form-footer myfont2">
                        Don't have an account? 
                        <Button
                            style={switchStyle}
                            onClick={() => auth.toggleSignUp()}>
                            Sign up now!
                        </Button>
                    </div>
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