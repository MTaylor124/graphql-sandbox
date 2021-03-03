import {useContext} from 'react'
import { GlobalContext } from '../../GlobalContext'
import { Redirect } from 'react-router'
import {PokeContextProvider} from './PokeContext'
import Pokemon from './Pokemon'


export default function PokemonHome() {

    let { auth } = useContext(GlobalContext)

    if (!auth.loggedIn) {
        return <Redirect to={{pathname: '/'}}/>
    } else {
        return (
            <PokeContextProvider>
                <Pokemon />
            </PokeContextProvider>
        )
    }
}
