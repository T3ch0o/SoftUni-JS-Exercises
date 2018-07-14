import React, { Component } from 'react';
import Image from './Image';


class CharactersList extends Component {
    constructor() {
        super();

        this.state = {
            images: []
        };

        this.promisifyState = obj => {
            return new Promise(res => {
                this.setState(obj, res)
            }).catch(e => {
                console.log(e);
            });
        }
    }

    componentDidMount() {
        fetch('http://localhost:9999/roster')
            .then(data => {
                return data.json();
            })
            .then(parsedData => {
                this.promisifyState({ images: parsedData })
                    .then(() => {
                        console.log('images loaded');
                    });
            });
    }

    render() {
        const images = this.state.images;

        const components = images.map((image, index) =>
            <div key={index}>
                <Image imageUrl={image.url} id={image.id}/>
            </div>
        );

        return (
            <div className='images'>
                {components}
            </div>
        );
    }
}

export default CharactersList;
