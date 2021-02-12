import {useContext} from 'react'
import { GlobalContext } from '../../GlobalContext'

import Backdrop from '@material-ui/core/Backdrop'

export default function Notification() {

    let {
        notification
    } = useContext(GlobalContext)

    const notificationStyle = {
        zIndex: 9278394857340782,
        // width: '200px',
        backgroundColor: 'rgba(0,0,0,0)',
        height: '50px',
        margin: '65px auto 0',
        minWidth: '50px',
        maxWidth: '400px',
        fontSize: '1.8rem',
        color: 'white'
    }
    return (
        <Backdrop
        open={notification.showingNotification}
        style={notificationStyle}
        transitionDuration={{enter: 300, exit: 800}}>
            {notification.notificationText}
        </Backdrop>
    )
}
