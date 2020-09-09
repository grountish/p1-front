import React, { Component } from 'react'
import gif from './../images/loader.gif';

class Loader extends Component {
    render() {
        return (
            <div>
                <img className="spinner" src={gif} alt=""/>
            </div>
        )
    }
}

export default Loader
