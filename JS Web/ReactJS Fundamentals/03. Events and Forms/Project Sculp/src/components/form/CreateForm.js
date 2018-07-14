import React, {Component} from 'react';

import validationFunc from '../../utils/createFormValidator';
import Input from "./formFields/Input";

export default class CreateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemonName: '',
            pokemonImg: '',
            pokemonInfo: ''
        };
    }

    submitCreate(event) {
        event.preventDefault();
        const payload = {
            pokemonName: this.state.pokemonName,
            pokemonImg: this.state.pokemonImg,
            pokemonInfo: this.state.pokemonInfo,
        };

        this.create(payload);
    }

    create(payload) {
        const validObj = validationFunc(
            this.state.pokemonName,
            this.state.pokemonImg,
            this.state.pokemonInfo
        );

        if (validObj.validPokemonName && validObj.validImgUrl && validObj.validInfo) {
            fetch('http://localhost:5000/pokedex/create', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(() => {
                    this.props.updateList();
                });
        }
    }

    render() {
        const validObj = validationFunc(
            this.state.pokemonName,
            this.state.pokemonImg,
            this.state.pokemonInfo
        );

        return (
            <form onSubmit={this.submitCreate.bind(this)}>
                <fieldset className='App'>
                    <div style={{display: 'inline-grid'}}>
                        <Input
                            type='text'
                            data='pokemonName'
                            name='Pokemon Name'
                            func={e => {
                                this.setState({pokemonName: e.target.value})
                            }}
                            valid={validObj.validPokemonName}
                        />
                        <Input
                            type='text'
                            data='pokemonImg'
                            name='Pokemon Image'
                            func={e => {
                                this.setState({pokemonImg: e.target.value})
                            }}
                            valid={validObj.validImgUrl}
                        />
                        <Input
                            type='text'
                            data='pokemonInfo'
                            name='Pokemon Info'
                            func={e => {
                                this.setState({pokemonInfo: e.target.value})
                            }}
                            valid={validObj.validInfo}
                        />

                        <input
                            type='submit'
                            value='Create Pokemon'
                        />
                    </div>
                </fieldset>
            </form>
        )
    }
}