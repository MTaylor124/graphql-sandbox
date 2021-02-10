import './style/App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"


import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import Nav from './components/Nav/Nav'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import About from './components/About/About'

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
  return (
    <MuiThemeProvider theme={theme}>
        <Router>
            <Nav />
            <div className="app-container">
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/auth' component={Auth} />
                    <Route path='/about' component={About} />
                </Switch>
            </div>
        </Router>
    </MuiThemeProvider>
  );
}
