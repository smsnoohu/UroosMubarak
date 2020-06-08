import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
    return(
        <footer>
            <ul>
                <li>
                    <NavLink exact to="/">
                        <em className="fa fa-home"></em>
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Events">
                        <em className="fa fa-calendar"></em>
                        <span>Events</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Dua">
                        <em className="fa fa-hand"></em>
                        <span>Dua</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/More">
                        <em className="fa fa-more"></em>
                        <span>More</span>
                    </NavLink>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;