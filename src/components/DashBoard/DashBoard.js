import React, { useState, Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DUA } from './DashboardData';
import './dashboard.scss';
import { DateFormetter, formatHijiriDate, getHijiriDay, getHijiriMonth } from '../../utils/DateFormetter';
import { EventContext } from '../../context/EventContextProvider';
import { DataContext } from '../../context/DataContextProvider';

const DashBoard = () => {
    const { setLoader } = useContext(EventContext);
    const { duas } = useContext(DataContext);
    const today = new Date();
    const [grigorianDate] = useState(DateFormetter(today));
    const [hijiriDate] = useState(formatHijiriDate(today));

    const [dua] = useState(DUA);

    const [error, setError] = useState(null);
    const [eventData, setEventData] = useState([]);

    const [hijiriDay] = useState(getHijiriDay(today));
    const [hijiriMonth] = useState(getHijiriMonth(today));

    console.log('duas: ', duas);

    // const randomDuaObj = duas[Math.floor(Math.random() * duas.length)] || {};

    // console.log('randomDuaObj: ', randomDuaObj.category);

    // const randomDua = randomDuaObj.dua[Math.floor(Math.random() * duas.length)] || {} || [];

    // console.log('randomDua: ', randomDua);

    

    useEffect(() => {
        const fetchEvent = async () => {
            setLoader(true);
            try{
                const eventData = await fetch('https://quthbiyamanzil.org/new/mproForApp.php?customvar='+ hijiriMonth + '&table1=UroosMubarak')
                let event = await eventData.json()
                event = event.data.filter((event, index) => parseInt(event.day) === hijiriDay).filter((event, index) => index < 3);
                setEventData(event);
                setLoader(false);
            } catch(e) {
                if(e){
                    console.log(e.message, 'Try updating the API');
                    setLoader(false);
                    setError(error);
                }
            }
        }
        fetchEvent();
    }, [hijiriDay, hijiriMonth, error, setLoader]);

    return(
        <>
            <div className="dash-container">
                <div className="display-date">{grigorianDate} ({hijiriDate})</div>
                <div className="today-event">
                    {error && <p>Error</p>}
                    {!error &&
                        <>
                            {eventData.length > 0 &&
                                <>
                                    {eventData.map((event, index) => {
                                        return(
                                            <Fragment key={event.id}>
                                                <h1>{event.title}</h1>
                                                {event.additionalInfo.substr().length > 175 &&
                                                    <p>{event.additionalInfo.slice(0, 150)}... <Link to="/Events">more</Link></p>
                                                }
                                                {event.additionalInfo.substr().length < 175 &&
                                                    <p>{event.additionalInfo}</p>
                                                }
                                                {index !== eventData.length-1 && <hr className="white" /> }
                                            </Fragment>
                                        )
                                    })}
                                    <p className="pt-20"><Link to="/Events">More Events</Link></p>
                                </>
                            }

                            {eventData.length === 0 &&
                                <>
                                    <h1>No Events listed on {hijiriDate}</h1>
                                    <p>If you get to know any events on today please <Link to="/Events">add the event(s)</Link>. Out team will verify and listed in future.</p>
                                    <p className="pt-20">You will navigate our event page for <Link to="/Events">More Events</Link></p>
                                </>
                            }
                        </>
                    }
                </div>
                {duas.length && (
                    <>
                        {duas[0].dua.filter((dua, index) => index === hijiriDay).map((d, index) => (
                            <Fragment key={d.id}>
                                <h2 className="pt-30 pb-10">{d.engTitle} {d.engTitle && d.tamilTitle && (<>-</>)} {d.tamilTitle}</h2>
                                <div className="dua-block">
                                    <p className="arab-text">{d.arabicText}</p>
                                    {d.translation && (<p>{d.translation}</p>)}
                                    {index !== dua.length-1 && <hr /> }
                                </div>
                            </Fragment>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}

export default DashBoard;