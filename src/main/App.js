import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BASE_PATH } from '../constent/general';
import '../assets/stylesheets/App.scss'
import EventContextProvider from '../context/EventContextProvider';
import PreLoad from './PreLoad';
import Wrapper from './Wrapper';

function App() {
    const [preLoad, setPreLoad] = useState(true);

    useEffect(() => {
        setTimeout(()=>{
            setPreLoad(false);
        }, 1);
    }, []);
    return (
        <>
            { preLoad && <PreLoad /> }
            { !preLoad &&
                <Router basename={BASE_PATH}>
                    <EventContextProvider>
                        <Wrapper />
                    </EventContextProvider>
                </Router>
            }
        </>
    );
}

export default App;
