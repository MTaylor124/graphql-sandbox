import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

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
    return (
        <div className='d-nav-container'>
            <div className="d-nav-shadow">
                <Link to='/' style={brandStyle}>
                    GraphQL / Firebase
                </Link>
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
                        Login / Sign up
                    </Button>
                </Link>
            </div>
        </div>
    )
}
