import React, {Component} from 'react';

export default class Pokemons extends Component {
    constructor(props) {
        super(props);

        this.promisifyState = obj => {
            return new Promise(res => {
                this.setState(obj, res)
            }).catch(e => {
                console.log(e);
            });
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/pokedex/pokedex')
            .then(res => res.json())
            .then(data => {
                this.promisifyState(this.setState({pokemons: data.pokemonColection}))
                    .then(() => {
                        this.props.updateList();
                        console.log('mount');
                    });
            });
    }

    render() {
        const pokemons = this.props.pokemons.map((p, i) =>
            <div key={i} style={({display: "inline-block", "width": "200px", "height": "200px", border: "2px solid orange"})}>
                <h1>{p.pokemonName}</h1>
                <h1>{p.pokemonInfo}</h1>
                <img style={({"width": "100px"})} alt='pokemon' src={p.pokemonImg}/>
            </div>
        );

        return (
            <div className="pokemons">
                {pokemons}
            </div>
        );
    }
}