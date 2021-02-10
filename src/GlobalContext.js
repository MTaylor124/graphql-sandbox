import {createContext, Component} from 'react'

export const GlobalContext = createContext()

export class GlobalContextProvider extends Component {
    constructor() {
        super()

        this.state = {
            auth: {
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
                        this.setState(s => {
                            // clear values
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