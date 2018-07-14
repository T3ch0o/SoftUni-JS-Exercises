import React, {Component} from 'react';
import observerMenu from './../utils/Observer';

class Image extends Component {
    constructor(props) {
        super(props);
        this.imageUrl = this.props.imageUrl;
    }

    render() {
        return (
            <img onClick={() => {
                observerMenu.executeObserver('changeImage', {id: this.props.id})
            }} className='image' alt='image' src={this.props.imageUrl}/>
        );
    }
}

export default Image;