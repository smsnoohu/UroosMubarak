import React, { useState, createContext } from 'react';

export const EventContext = createContext();

const EventContextProvider = props => {
    const [clicked, setClicked] = useState({});

    const [isLoader, setLoader] = useState(false);

    function toggleComponent(e, target){
        let component = target || e.target.dataset.target || '';
        if(e && e !== undefined){
            e.preventDefault();
        }
        setClicked({ ...clicked, [component]: !clicked[component] });
    }



    return(
        <EventContext.Provider
            value={{
                clicked,
                toggleComponent,
                isLoader,
                setLoader
            }}
        >
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider;