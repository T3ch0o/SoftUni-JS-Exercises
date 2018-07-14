import React, { Component } from 'react';

import left from './../resources/left.png';
import right from './../resources/right.png';

class Slider extends Component {
    constructor() {
        super();

        this.state = {
            selectedImg: ''
        };

        this.promisifyState = obj => {
            return new Promise(res => {
                this.setState(obj, res);
            }).catch(e => {
                console.log(e);
            })
        }
    }

    componentWillReceiveProps() {
        fetch(`http://localhost:9999/episodePreview/${this.props.focusImageId}`)
            .then(data => {
                return data.json();
            })
            .then(parseData => {
                this.promisifyState({ selectedImg: parseData.url })
                    .then(() => {
                        console.log('loaded new state');
                    });
            });
    }

    componentDidMount() {
        fetch(`http://localhost:9999/episodePreview/${this.props.focusImageId}`)
            .then(data => {
                return data.json();
            })
            .then(parseData => {
                this.promisifyState({ selectedImg: parseData.url })
                    .then(() => {
                        console.log('mount');
                    });
            });
    }

    render() {
        return (
            <div>
                <div className='warper'>
                    <img
                        alt='leftArrow'
                        src={left}
                        className='slider-elem slider-button case-left'
                        onClick={() =>
                            this.props.updateFunc(
                                Number(this.props.focusImageId) === 0
                                    ? 0
                                    : Number(this.props.focusImageId) - 1
                            )}
                    />
                    <img
                        className='sliderImg slider-elem'
                        alt='focusedEp'
                        src={this.state.selectedImg}
                    />
                    <img
                        src={right}
                        className='slider-elem slider-button case-right'
                        onClick={() =>
                            this.props.updateFunc(
                                Number(this.props.focusImageId) === 2
                                    ? 2
                                    : Number(this.props.focusImageId) + 1
                            )}
                    />
                </div>
            </div>
        );
    }
}

export default Slider;
