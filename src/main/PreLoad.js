import React from 'react';

const PreLoad = () => {
    return(
        <div id="preload">
            <div className="preload">
                <h1>Welcome to Uroos Mubarak</h1>
                <div><img src={require('../assets/images/logo.svg?1')} alt="Uroos Mubarak" /></div>
                <div><img src={require('../assets/images/logoText.svg?1')} alt="Uroos Mubarak" /></div>
            </div>
        </div>
    )
}

export default PreLoad;