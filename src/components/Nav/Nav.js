import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext'

export default function Nav() {

    const brandStyle = {
        textDecoration: 'none',
        fontSize: '1.8rem',
        // color: 'rgb(230, 185, 108)',
        color: 'white',
        marginRight: '40px',
        fontWeight: '600',
        marginLeft: '10px'
        // padding: '10px 0'
    }
    const linkStyle = {
        // marginRight: '15px',
        textDecoration: 'none',
        height: '100%'
    }
    const linkButton = {
        borderRadius: '0',
        padding: '5px 10px',
        height: '100%',
        width: '100%',
        // color: 'rgb(230, 185, 108)',
        color: 'white',
        fontSize: '1.4rem',
        textTransform: 'none',
    }
    const fancyLinkStyle = {
        // marginRight: '15px',
        textDecoration: 'none',
        height: '100%'
    }
    const fancyLinkButton = {
        borderRadius: '0',
        // padding: '5px 10px',
        padding: '0 10px',
        height: '100%',
        width: '100%',
        // color: 'rgb(230, 185, 108)',
        color: 'rgb(255 203 10)',
        fontSize: '1.8rem',
        textTransform: 'none',
        WebkitTextStrokeWidth: '2px',
        WebkitTextStrokeColor: 'rgb(46, 111, 182)',
        fontWeight: '800'
        // backgroundColor: 'rgb(46, 111, 182)',
        // textShadow: '-1px -1px 0 rgb(46, 111, 182), 0   -1px 0 rgb(46, 111, 182), 1px -1px 0 rgb(46, 111, 182), 1px  0   0 rgb(46, 111, 182), 1px  1px 0 rgb(46, 111, 182), 0    1px 0 rgb(46, 111, 182), -1px  1px 0 rgb(46, 111, 182), -1px  0   0 rgb(46, 111, 182)'
        // webkitText
    }

    let {
        auth
    } = useContext(GlobalContext)
    
    let authCheck, pokeButton

    if (auth.loggedIn) {
        authCheck = 'My Account'
        pokeButton = (
            <Link to='/pokemon' style={fancyLinkStyle}>
                <Button style={fancyLinkButton}>
                    Pokemon
                </Button>
            </Link>
        )
    } else {
        authCheck = 'Login / Sign up' 
        pokeButton = ''
    }

    return (
        <div className='d-nav-container'>
            <div className="d-nav-shadow">
                <Link to='/' style={brandStyle}>
                    GraphQL / Firebase
                </Link>
                {pokeButton}
                <Link to='/' style={linkStyle}>
                    <Button style={linkButton}>
                        Home
                    </Button>
                </Link>
                <Link to='/about' style={linkStyle}>
                    <Button style={linkButton}>
                        About
                    </Button>
                </Link>
                <Link to='/auth' style={linkStyle}>
                    <Button style={linkButton}>
                        {authCheck}
                    </Button>
                </Link>
            </div>
        </div>
    )
}
