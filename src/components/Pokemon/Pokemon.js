import {useContext} from 'react'
import { PokeContext } from './PokeContext'

export default function Pokemon() {
    let {
        poke  
    } = useContext(PokeContext)

    return (
        <div>
            {poke}
        </div>
    )
}
