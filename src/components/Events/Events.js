import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './events.scss';
import Button from '../../main/Shared/FormComponents/Button';
import Datepicker from '../../main/Shared/FormComponents/DatePicker/Datepicker';
import Accordion from '../../main/Shared/Accordion/Accordion';
import { DateFormetter, formatHijiriDate, getHijiriDay, getHijiriMonth } from '../../utils/DateFormetter';
import { EventContext } from '../../context/EventContextProvider';

const Events = () => {
    const { setLoader } = useContext(EventContext);
    const today = new Date();
    const [grigorianDate, setGrigorianDate] = useState(DateFormetter(today));
    const [hijiriDate, setHijiriDate] = useState(formatHijiriDate(today));

    const [error, setError] = useState(null);
    const [eventData, setEventData] = useState([]);

    const [hijiriDay, setHijiriDay] = useState(getHijiriDay(today));
    const [hijiriMonth, setHijiriMonth] = useState(getHijiriMonth(today));

    const [eventDate, setEventDate] = useState(today);
    const updateDate = (date) => {
        setEventDate(date);
        setGrigorianDate(DateFormetter(date));
        setHijiriDate(formatHijiriDate(date));
        setHijiriDay(getHijiriDay(date));
        if(hijiriMonth !== getHijiriMonth(date)){
            setHijiriMonth(getHijiriMonth(date));
        }
    }
    const updateEventDate = date => {
        updateDate(date);
    }
    const getPrevDate = () => {
        let nextDay = new Date(eventDate);
        nextDay.setDate(eventDate.getDate() - 1);
        updateDate(nextDay);
    }
    const getNextDate = () => {
        let nextDay = new Date(eventDate);
        nextDay.setDate(eventDate.getDate() + 1);
        updateDate(nextDay);
    }

    const fetchEvent = () => {
        setLoader(true);
        fetch('https://quthbiyamanzil.org/new/mpro.php?customvar='+ hijiriMonth + '&table1=ThisDay')
            .then(response => response.json())
            .then((result) => {
                setLoader(false);
                let event = result.aaData;
                setEventData(event);
            },
            (error) => {
                setLoader(false);
                setError(error);
            })
    }

    useEffect(() => {
        fetchEvent();
    }, [hijiriMonth]);
    
    return(
        <>
            <div className="events-wrapper">
                <div className="date-nav">
                    <Button className="light" icon="chevron-left" isIconOnly handleClick={getPrevDate} />
                    <Datepicker id="eventDate" name="eventDate" selected={eventDate} format="dd/MM/yyyy" value={eventDate} handleChange={(date) => updateEventDate(date)} />
                    <Button className="light" icon="chevron-right" isIconOnly handleClick={getNextDate} />
                </div>
                <div className="display-date">{grigorianDate} | {hijiriDate}</div>
                <div className="event-accordion">
                    <div>
                    {error && <p>Error</p>}
                    {!error &&
                        <>
                            {eventData.filter(event => parseInt(event.Day) === hijiriDay).length > 0 &&
                                <>
                                    {eventData.filter(event => parseInt(event.Day) === hijiriDay).map((event, index) => {
                                        return(
                                            <Accordion key={event.Day + index} id={'day_' + event.Day + index} title={event.Details} content={<AccordionContent data={event} />} />
                                        )
                                    })}
                                </>
                            }

                            {eventData.filter(event => parseInt(event.Day) === hijiriDay).length === 0 &&
                                <>
                                    <h1>No Events listed on {hijiriDate}</h1>
                                    <p>If you get to know any events on today please <Link to="/Events">add the event(s)</Link>. Out team will verify and listed in future.</p>
                                </>
                            }
                        </>
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

const AccordionContent = ({ data }) => {
    return(
        <>
            <ul className="event-list">
                <li>
                    <strong>Birth Place</strong>
                    <span>{data.birthPlace}</span>
                </li>
                <li>
                    <strong>Ziyarath Place</strong>
                    <span>{data.ziyarathPlace}</span>
                </li>
                <li>
                    <h5>Description</h5>
                    <p>{data.Remarks}</p>
                </li>
            </ul>
        </>
    )
}

export default Events;