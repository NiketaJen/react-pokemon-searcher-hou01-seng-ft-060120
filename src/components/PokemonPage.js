import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

const API = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {
  constructor(){
    super()
    this.state = {
      pokemon: [],
      search: ""
    }
  }

  componentDidMount(){
    fetch(API)
    .then(response => response.json())
    .then(pokemon => this.setState({pokemon}))
  }

  pokeSearch = (e)=> {
   this.setState({
    search: e.target.value
   })
  }

  handleSubmit = (e, formData) => {
    e.preventDefault()
    e.target.reset()

    const poke = {
      name: formData.name,
      hp: formData.hp,
      sprites: {
        front: formData.fronUrl,
        back: formData.backUrl
      }
    }
    fetch(API, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(poke)
    })
    .then(response => response.json())
    .then(poke => {
      const pokemon = [...this.state.pokemon, poke]
      this.setState({pokemon})
    })
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleSubmit={this.handleSubmit}/>
        <br />
        <Search pokeSearch={this.pokeSearch}/>
        <br />
        <PokemonCollection pokemon={this.state.pokemon} pokeSearch={this.state.search} />
      </Container>
    )
  }
}

export default PokemonPage
