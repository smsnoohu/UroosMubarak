import React, { useState, Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DUA } from './DashboardData';
import './dashboard.scss';
import { DateFormetter, formatHijiriDate, getHijiriDay, getHijiriMonth } from '../../utils/DateFormetter';
import { EventContext } from '../../context/EventContextProvider';

const DashBoard = () => {
    const { setLoader } = useContext(EventContext);
    const today = new Date();
    const [grigorianDate] = useState(DateFormetter(today));
    const [hijiriDate] = useState(formatHijiriDate(today));

    const [dua] = useState(DUA);

    const [error, setError] = useState(null);
    const [eventData, setEventData] = useState([]);

    const [hijiriDay] = useState(getHijiriDay(today));
    const [hijiriMonth] = useState(getHijiriMonth(today));

    const fetchEvent = () => {
        setLoader(true);
        fetch('https://quthbiyamanzil.org/new/mpro.php?customvar='+ hijiriMonth + '&table1=ThisDay')
            .then(response => response.json())
            .then((result) => {
                setLoader(false);
                let event = result.aaData.filter((event, index) => parseInt(event.Day) === hijiriDay).filter((event, index) => index < 3);
                setEventData(event);
            },
            (error) => {
                setLoader(false);
                setError(error);
            })
    }

    useEffect(() => {
        fetchEvent();
    }, [hijiriDay, hijiriMonth]);

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
                                            <Fragment key={event.Day + index}>
                                                <h1>{event.Details}</h1>
                                                {event.Remarks.substr().length > 175 &&
                                                    <p>{event.Remarks.slice(0, 150)}... <Link to="/Events">more</Link></p>
                                                }
                                                {event.Remarks.substr().length < 175 &&
                                                    <p>{event.Remarks}</p>
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
                <h2 className="pt-20 pb-10">Dua of the day</h2>
                <div className="dua-container">
                    <>
                        {dua.map((d, index) => {
                            return(
                                <Fragment key={d.id}>
                                    <p>{d.desc}</p>
                                    {index !== dua.length-1 && <hr /> }
                                </Fragment>
                            )
                        })}
                    </>
                </div>
            </div>
        </>
    );
}

export default DashBoard;