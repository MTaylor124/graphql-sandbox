import {useContext} from 'react'
import { PokeContext } from './PokeContext'
import {GlobalContext} from './../../GlobalContext'

import Button from '@material-ui/core/Button'
import Pokedex from 'pokedex-promise-v2'

import firebase from 'firebase/app'
import 'firebase/firestore'

export default function Pokemon() {

    const pokemonList = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandslash","Nidorina","Nidoqueen","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetchd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr-mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"]
    
    let P = new Pokedex()

    let {
        addToPokemList,
        showPokemon,
        pokemList
    } = useContext(PokeContext)

    let {
        user
    } = useContext(GlobalContext)

    const testButton = {
        textTransform: 'none',
        marginBottom: '10px',
        fontSize: '1.8rem',
        color: 'white',
        outline: '1px solid white',
        width: '85%'
    }
    function handleGetRandomPokemonType() {
        let randomPokemonID = Math.floor((Math.random() * pokemonList.length))
        let initialName = pokemonList[randomPokemonID]
        let splitName = initialName.split('')
        splitName[0] = splitName[0].toLowerCase()
        let fixedName = splitName.join('')

        P.getPokemonByName(fixedName) 
        .then(data => {
            console.log(`${initialName}: ${data.types[0].type.name}`)
            console.log('more data', data)
        })
        .catch(error => {
            console.error(error)
        })
    }
    function handleGetAll() {
        pokemonList.forEach(pokemon => {
            let splitName = pokemon.split('')
            splitName[0] = splitName[0].toLowerCase()
            let fixedName = splitName.join('')

            P.getPokemonByName(fixedName) 
            .then(data => {
                addToPokemList({
                    name: pokemon,
                    type: data.types[0].type.name,
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    specialAttack: data.stats[3].base_stat,
                    specialDefense: data.stats[4].base_stat,
                    speed: data.stats[5].base_stat
                })
            })
            .catch(error => {
                console.error(error)
            })
        })
    }
    function handleWriteToDatabase() {
        pokemList.forEach(pokemon => {
            firebase.firestore().collection('users').doc(user.docRef).collection('pokemon')
            .add({
                name: pokemon.name,
                type: pokemon.type,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                specialAttack: pokemon.specialAttack,
                specialDefense: pokemon.specialDefense,
                speed: pokemon.speed
            })
            .then(docRef => {
                console.log(`added ${pokemon.name} to database`)
            })
            .catch(err => {
                console.error(err.code)
            })
        })
    }
    function handleDeleteDatabase() {
        firebase.firestore().collection('users').doc(user.docRef).collection('pokemon')
        .get()
        .then(snap => {
            snap.forEach(doc => {
                firebase.firestore().collection('users').doc(user.docRef).collection('pokemon').doc(doc.id)
                .delete()
                .then(() => {
                    console.log('deleted')
                })
                .catch(err => {
                    console.error(err.code)
                }) 
            })
        })
    }

    return (
        <div className='d-poke-container'>
            <Button
                style={testButton}
                onClick={() => handleGetRandomPokemonType() }>
                get random pokemon
            </Button>
            <Button
                style={testButton}
                onClick={() => handleGetAll() }>
                get all pokemon
            </Button>
            <Button
                style={testButton}
                onClick={() => showPokemon() }>
                console log pokemon
            </Button>
            <Button
                style={testButton}
                onClick={() => handleWriteToDatabase() }>
                write pokemon to database
            </Button>
            <Button
                style={testButton}
                onClick={() => handleDeleteDatabase() }>
                delete pokemon database
            </Button>
        </div>
    )
}
