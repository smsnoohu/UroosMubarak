import React, { useContext } from 'react';
import './accordion.scss';
import { EventContext } from '../../../context/EventContextProvider';

const Accordion = props => {
    const { clicked, toggleComponent } = useContext(EventContext);

    let { id, variation, title, content } = props;
    return(
        <>
            <div className={`accordion-container${variation ? ' variation' + variation : ''}`}>
                <button className={`accordion-heading${clicked[id] ? ' open' : ''}`} onClick={toggleComponent} data-target={`${id}`}>{title}</button>
                {clicked[id] && (
                    <div className="accordion-content">{content}</div>
                )}
            </div>
        </>
    )
}

export default Accordion;