import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BASE_PATH } from '../constent/general';
import '../assets/stylesheets/App.scss'
import EventContextProvider from '../context/EventContextProvider';
import Wrapper from './Wrapper';

function App() {
    return (
        <>
            <Router basename={BASE_PATH}>
                <EventContextProvider>
                    <Wrapper />
                </EventContextProvider>
            </Router>
        </>
    );
}

export default App;
