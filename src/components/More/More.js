import React from 'react';
import { Link } from 'react-router-dom';
import './more.scss';

const More = () => {
    return(
        <>
            <ul className="more-list">
                <li><Link to="/AddEvent" className="addEvent">Add Event</Link></li>
                <li><Link to="/ContactUs" className="contactUs">Contact Us</Link></li>
            </ul>
        </>
    )
}

export default More;