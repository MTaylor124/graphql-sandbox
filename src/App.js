import './style/App.css'

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"


import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import Backdrop from '@material-ui/core/Backdrop'

import Nav from './components/Nav/Nav'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import About from './components/About/About'
import Notification from './components/Notification/Notification'

import {useContext} from 'react'
import {GlobalContext} from './GlobalContext'

const theme = createMuiTheme({
    background: 'rgb(116, 181, 207)',
    palette: {
        primary: {
            main: 'rgb(0, 0, 0)',
            light: 'rgb(0, 0, 0)',
            dark: 'rgb(0, 0, 0)'
        },
        secondary: {
            main: 'rgb(255, 255, 255)',
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(1, 1, 1)'
        }
    }
})

export default function App() {

    let {
        transition
    } = useContext(GlobalContext)

    let durationCheck, heightCheck, widthCheck


    
    if (transition.landing) {
        durationCheck = { enter: 0, exit: 300 }
        widthCheck = '100vw'
        heightCheck = '100vh'
    } else {
        durationCheck = 500
        widthCheck = '625px'
        heightCheck = '625px'
    }
    
    const fadeStyle = {
        zIndex: 24383475,
        backgroundColor: 'rgb(73, 148, 230)',
        width: widthCheck,
        height: heightCheck,
        margin: 'auto'
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                <Nav />
                <div className="app-container">
                    <Notification />
                    <Backdrop
                        open={transition.fading}
                        style={fadeStyle}
                        transitionDuration={durationCheck}
                    >
                    </Backdrop>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/auth' component={Auth} />
                        <Route path='/about' component={About} />
                    </Switch>
                </div>
            </Router>
        </MuiThemeProvider>
    )
}
