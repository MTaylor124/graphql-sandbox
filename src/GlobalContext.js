import {createContext, Component} from 'react'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const GlobalContext = createContext()

export class GlobalContextProvider extends Component {
    constructor() {
        super()

        this.state = {
            auth: {
                form: {
                    email: null,
                    password: null,
                    confirm: null,
                    setValue: (field, newValue) => {
                        if (field === 'email') {
                            this.setState(s => {
                                return s.auth.form.email = newValue
                            })
                        } else if (field === 'password') {
                            this.setState(s => {
                                return s.auth.form.password = newValue
                            })
                        } else if (field === 'confirm') {
                            this.setState(s => {
                                return s.auth.form.confirm = newValue
                            })
                        } else {
                            return
                        }
                    },
                    clearValues: () => {
                        this.setState(s => {
                            s.auth.form.email = null
                            s.auth.form.password = null
                            s.auth.form.confirm = null
                            return s
                        })
                    },
                    emailError: null,
                    passwordError: null,
                    confirmError: null,
                    showEmailError: false,
                    showPasswordError: false,
                    showConfirmError: false,
                    setError: (field, error) => {
                        if (field === 'email') {
                            this.setState(s => {
                                s.auth.form.showEmailError = true
                                return s.auth.form.emailError = error
                            })
                        } else if (field === 'password') {
                            this.setState(s => {
                                s.auth.form.showPasswordError = true
                                return s.auth.form.passwordError = error
                            })
                        } else if (field === 'confirm') {
                            this.setState(s => {
                                s.auth.form.showConfirmError = true
                                return s.auth.form.confirmError = error
                            })
                        } else {
                            return
                        }
                    },
                    clearErrors: () => {
                        this.setState(s => {
                            s.auth.form.emailError = null
                            s.auth.form.passwordError = null
                            s.auth.form.confirmError = null
                            s.auth.form.showEmailError = false
                            s.auth.form.showPasswordError = false
                            s.auth.form.showConfirmError = false
                            return s
                        })
                    }
                },
                loggedIn: false,
                logIn: () => {
                    this.setState(s => {
                        return s.auth.loggedIn = true
                    })
                },
                logOut: () => {
                    this.setState(s => {
                        return s.transition.fading = true
                    })
                    setTimeout(() => {
                        this.state.auth.form.clearValues()
                        this.setState(s => {
                            s.auth.loggedIn = false
                            return s.auth.signUp = false
                        })
                    }, 400)
                    setTimeout(() => {
                        this.setState(s => {
                            return s.transition.fading = false
                        })
                    }, 450)
                },
                signUp: false,
                toggleSignUp: () => {
                    this.setState(s => {
                        return s.transition.fading = true
                    })
                    setTimeout(() => {
                        this.state.auth.form.clearValues()
                        this.state.auth.form.clearErrors()
                        this.setState(s => {
                            return s.auth.signUp = !this.state.auth.signUp
                        })
                    }, 400)
                    setTimeout(() => {
                        this.setState(s => {
                            return s.transition.fading = false
                        })
                    }, 450)
                },
                submitting: false,
                submitCredentials: () => {
                    this.setState(s => {
                        return s.auth.submitting = true
                    })
                },
                endSubmitting: () => {
                    this.setState(s => {
                        return s.auth.submitting = false
                    })
                },
                changePass: {
                    showing: false,
                    toggleChangePassword: () => {
                        this.setState(s => {
                            return s.transition.fading = true
                        })
                        setTimeout(() => {
                            this.state.auth.changePass.clearForm()
                            this.setState(s => {
                                return s.auth.changePass.showing = !this.state.auth.changePass.showing
                            })
                        }, 500)
                        setTimeout(() => {
                            this.setState(s => {
                                return s.transition.fading = false
                            })
                        }, 700)
                    },
                    clearForm: () => {
                        this.setState(s => {
                            s.auth.changePass.newPassword = ''
                            s.auth.changePass.confirmPassword = ''
                            s.auth.changePass.newError = null
                            s.auth.changePass.confirmError = null
                            s.auth.changePass.showNewError = false
                            s.auth.changePass.showconfirmError = false
                            return s
                        })
                    },
                    newPassword: '',
                    confirmPassword: '',
                    newError: null,
                    confirmError: null,
                    showNewError: false,
                    showConfirmError: false,
                    setError: (type, err) => {
                        if (type === 'confirm') {
                            this.setState(s => {
                                s.auth.changePass.showConfirmError = true
                                return s.auth.changePass.confirmError = err
                            })
                        } else {
                            this.setState(s => {
                                s.auth.changePass.showNewError = true
                                return s.auth.changePass.newError = err
                            })
                        }
                    },
                    clearErrors: () => {
                        this.setState(s => {
                            s.auth.changePass.newError = null
                            s.auth.changePass.confirmError = null
                            s.auth.changePass.showNewError = false
                            s.auth.changePass.showconfirmError = false
                            return s
                        })
                    },
                    setPass: (type, content) => {
                        if (type === 'confirm') {
                            this.setState(s => {
                                return s.auth.changePass.confirmPassword = content
                            })
                        } else {
                            this.setState(s => {
                                return s.auth.changePass.newPassword = content
                            })
                        }
                    },
                    updating: false,
                    update: () => {
                        this.setState(s => {
                            return s.auth.changePass.updating = true
                        })
                    },
                    updated: () => {
                        // set notification
                        this.setState(s => {
                            s.auth.changePass.newPassword = ''
                            s.auth.changePass.confirmPassword = ''
                            s.auth.changePass.newError = null
                            s.auth.changePass.confirmError = null
                            s.auth.changePass.showNewError = false
                            s.auth.changePass.showconfirmError = false
                            s.auth.changePass.showing = false
                            return s.auth.changePass.updating = false
                        })
                    },
                    failed: () => {
                        this.setState(s => {
                            return s.auth.changePass.updating = false
                        })
                    }
                }
            },
            notification: {
                blockingAuto: false,
                blockAuto: () => {
                    this.setState(s => {
                        return s.notification.blockingAuto = true
                    })
                    setTimeout(() => {
                        this.setState(s => {
                            return s.notification.blockingAuto = false
                        })
                    }, 5000)
                },
                showingNotification: false,
                notificationText: '',
                showNotification: (notif) => {
                    this.setState(s => {
                        return s.notification.notificationText = notif
                    })
                    setTimeout(() => {
                        this.setState(s => {
                            return s.notification.showingNotification = true
                        })
                    }, 1000)
                    setTimeout(() => {
                        this.setState(s => {
                            return s.notification.showingNotification = false
                        })
                    }, 5000)
                    setTimeout(() => {
                        this.setState(s => {
                            return s.notification.notificationText = ''
                        })
                    }, 6000)
                }  
            },
            user: {
                uid: null,
                setuid: (uid) => {
                    this.setState(s => {
                        return s.user.uid = uid
                    })
                },
                docRef: null,
                setDocRef: (docRef) => {
                    this.setState(s => {
                        return s.user.docRef = docRef
                    })
                }
            },
            transition: {
                fading: true,
                landing: true
            }
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState(s => {
                return s.transition.fading = false
            })
        }, 1000)
        setTimeout(() => {
            this.setState(s => {
                return s.transition.landing = false
            })
        }, 1310)
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState(s => {
                    s.user.uid = user.uid
                    return s.auth.loggedIn = true
                })
                if (this.state.notification.blockingAuto === false) {
                    setTimeout(() => {
                        this.state.notification.showNotification('Welcome Back')
                    }, 1000)
                    firebase.firestore().collection('users').where('userID', '==', user.uid).limit(1)
                    .get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            // console.log('date?', doc.data().joined)
                            console.log('logged in')
                        })
                    })
                    .catch(err => {
                        console.error(err.code)
                    })
                }
            }
        })
    }
    
    render() {
        return (
            <GlobalContext.Provider value={this.state}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}