import {createContext, Component} from 'react'

// import firebase from 'firebase/app'
// import 'firebase/firestore'

export const PokeContext = createContext()

export class PokeContextProvider extends Component {
    constructor() {
        super()

        this.state = {
            poke: 'yes'
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