import {createContext, Component} from 'react'

// import firebase from 'firebase/app'
// import 'firebase/firestore'

export const PokeContext = createContext()

export class PokeContextProvider extends Component {
    constructor() {
        super()

        this.state = {
            pokemList: [],
            addToPokemList: newPokemon => {
                this.setState({
                    pokemList: [...this.state.pokemList, newPokemon]
                })
            },
            showPokemon: () => {
                console.log('pokemlist:', this.state.pokemList)
            }
        }
    }

    componentDidMount() {
        // console.log('poke')
    }
    
    render() {
        return (
            <PokeContext.Provider value={this.state}>
                {this.props.children}
            </PokeContext.Provider>
        )
    }
}