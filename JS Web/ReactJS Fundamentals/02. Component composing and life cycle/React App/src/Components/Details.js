import React, {Component} from 'react';
import Image from './Image';

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentChar: {}
        }
    }

    componentDidMount() {
        fetch(`http://localhost:9999/character/${this.props.characterId}`)
            .then(data => {
                return data.json();
            })
            .then(parsedData => {
                this.setState({currentChar: parsedData})
            });
    }

    componentWillReceiveProps(nextProps) {
        let newCharId = nextProps.characterId.id;

        fetch(`http://localhost:9999/character/${newCharId}`)
            .then(data => {
                return data.json();
            })
            .then(parsedData => {
                this.setState({currentChar: parsedData})
            });

    }

    render() {
        return (
            <fieldset className='images'>
                <Image className='image' imageUrl={this.state.currentChar.url}/>
                <p>{this.state.currentChar.bio}</p>
            </fieldset>
        )

    }

}

export default Details;