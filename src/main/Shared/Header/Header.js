import React from 'react';
import './header.scss';

const Header = () => {
    return(
        <header>
            <div className="logo">
                <img src={require('../../../assets/images/logo.svg')} alt="Uroos Mubarak" />
                <img src={require('../../../assets/images/logoText.svg')} alt="Uroos Mubarak" />
            </div>
        </header>
    )
}

export default Header;