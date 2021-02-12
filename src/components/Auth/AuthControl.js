import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import firebase from 'firebase/app'
import 'firebase/auth'

export default function AuthControl() {

    const useStyles = makeStyles({
        root: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0,0)",
                backgroundColor: 'rgba(0,0,0,0.05)',
                // borderRadius: '0'
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0,0)",
                backgroundColor: 'rgba(0,0,0,0.1)',
                // borderRadius: '0'
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0,0)",
                backgroundColor: 'rgba(0,0,0,0.2)',
                // borderRadius: '0'
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
    const classes = useStyles();

    let {
        auth,
        notification
    } = useContext(GlobalContext)

    let headerMessage, authContent, updatingFeedback

    const authButton = {
        height: '50px',
        width: '420px',
        fontSize: '1.8rem',
        textTransform: 'none',
        marginBottom: '25px',
        fontFamily: 'Helvetica'
        // backgroundColor: 'rgba(0,0,0,0.1)'
    }
    const customStyle = {
        marginBottom: '20px',
        width: '420px',
        borderTop: '30px'
    }
    const feedbackStyle = {
        color: 'white'
    }
    if (auth.changePass.updating) {
        updatingFeedback = (
            <CircularProgress 
                style={feedbackStyle}
                size={30}
            />
        )
    } else {
        updatingFeedback = 'Update Password'
    }
    if (auth.changePass.showing) {
        headerMessage = ''
        authContent = (
            <div className="d-auth-control-options-container">
                <TextField
                    type='password'
                    error={auth.changePass.showOldError}
                    helperText={auth.changePass.oldError}
                    onChange={(e) => auth.changePass.setPass('old', e.target.value)}
                    value={auth.changePass.oldPassword}
                    style={customStyle}
                    className={classes.root}
                    variant="outlined"
                    disabled={auth.changePass.updating}
                    label="Old Password"
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
                    type='password'
                    error={auth.changePass.showNewError}
                    helperText={auth.changePass.newError}
                    onChange={(e) => auth.changePass.setPass('new', e.target.value)}
                    value={auth.changePass.newPassword}
                    style={customStyle}
                    className={classes.root}
                    variant="outlined"
                    disabled={auth.changePass.updating}
                    label="New Password"
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
                    type='password'
                    error={auth.changePass.showConfirmError}
                    helperText={auth.changePass.confirmError}
                    onChange={(e) => auth.changePass.setPass('confirm', e.target.value)}
                    value={auth.changePass.confirmPassword}
                    className={classes.root}
                    style={customStyle}
                    variant="outlined"
                    label="Confirm Password"
                    disabled={auth.changePass.updating}
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
                    disabled={auth.changePass.updating}
                    color='secondary'
                    style={authButton}
                    onClick={() => handleUpdatePassword()}>
                    {updatingFeedback}
                </Button>
                <Button 
                    disabled={auth.changePass.updating}
                    color='secondary'
                    style={authButton}
                    onClick={() => auth.changePass.toggleChangePassword()}>
                    Cancel
                </Button>
            </div>
        )
    } else {
        headerMessage = 'Account'
        authContent = (
            <div className="d-auth-control-options-container">
                <Button 
                    color='secondary'
                    style={authButton}
                    onClick={() => auth.changePass.toggleChangePassword()}>
                    Change Password
                </Button>
                <Button 
                    color='secondary'
                    style={authButton}
                    onClick={() => handleLogOut()}>
                    Log out
                </Button>
            </div>
        )
    }
    function handleLogOut() {

        firebase.auth().signOut()
        .then(() => {
            notification.showNotification('Signed out successfully')
            auth.logOut()
        })
        .catch(err => {
            console.error(err.code)
        })
    }
    function handleUpdatePassword() {
        auth.changePass.clearErrors()

        if (!auth.changePass.oldPassword) {
            auth.changePass.setError('old', 'Password must not be blank')
        } else if (!auth.changePass.newPassword) {
            auth.changePass.setError('new', 'Password must not be blank')
        } else if (!auth.changePass.confirmPassword) {
            auth.changePass.setError('confirm', 'Confirm Password must not be blank')
        } else if (auth.changePass.newPassword !== auth.changePass.confirmPassword) {
            auth.changePass.setError('confirm', 'Password and Confirm Password must be identical')
        } else {
            auth.changePass.update()

            let user = firebase.auth().currentUser
            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email, 
                auth.changePass.oldPassword
            )

            user.reauthenticateWithCredential(credential)
            .then(() => {
                user.updatePassword(auth.changePass.confirmPassword)
                .then(() => {
                    notification.showNotification('Password Updated!')
                    auth.changePass.updated()
                })
                .catch(err => {
                    setTimeout(() => {
                        auth.changePass.failed()
                        if (err.code === 'auth/weak-password') {
                            auth.changePass.setError('new', err.message)
                        } else {
                            console.error(err.code)
                            notification.showNotification(`Error: ${err.message}`)
                        }
                    }, 2000)
                })
            })
            .catch(err => {
                auth.changePass.setError('old', err.message)
                auth.changePass.failed()
            })
        }
    }
    return (
        <div className='d-section-container'>
            <div className="d-auth-control-container">
                <div className="d-auth-control-header myfont1">
                    {headerMessage}
                </div>
                {authContent}
            </div>
        </div>
    )
}
