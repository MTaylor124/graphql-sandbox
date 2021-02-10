import {createContext, Component} from 'react'

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
                        return s.auth.loggedIn = false
                    })
                },
                signUp: false,
                toggleSignUp: () => {
                    this.setState(s => {
                        return s.transition.fading = true
                    })
                    setTimeout(() => {
                        this.state.auth.form.clearValues()
                        this.setState(s => {
                            return s.auth.signUp = !this.state.auth.signUp
                        })
                    }, 300)
                    setTimeout(() => {
                        this.setState(s => {
                            return s.transition.fading = false
                        })
                    }, 350)
                },
                submitting: false,
                submitCredentials: () => {
                    this.setState(s => {
                        return s.auth.submitting = true
                    })
                    // setTimeout(() => {
                    //     this.state.notification.showNotification(`${message} Successfully!`)
                    // }, 2000)
                },
                endSubmitting: () => {
                    this.setState(s => {
                        return s.auth.submitting = false
                    })
                },
                submitSuccessful: () => {

                }
            },
            notification: {
                showingNotification: true,
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
                fading: false
            }
        }
    }
    
    render() {
        return (
            <GlobalContext.Provider value={this.state}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}