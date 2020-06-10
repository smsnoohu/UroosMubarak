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

    useEffect(() => {

        const fetchEvent = async () => {
            setLoader(true);
            try{
                const eventData = await fetch('https://quthbiyamanzil.org/new/mproForApp.php?customvar='+ hijiriMonth + '&table1=UroosMubarak')
                let event = await eventData.json()
                event = event.data;
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
    }, [hijiriMonth, error, setLoader]);
    
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
                    <>
                        {error && <p>Error</p>}
                        {!error &&
                            <>
                                {eventData.filter(event => parseInt(event.day) === hijiriDay).length > 0 &&
                                    <>
                                        {eventData.filter(event => parseInt(event.day) === hijiriDay).map((event, index) => {
                                            return(
                                                <Accordion key={event.id} id={event.id} title={event.title} content={<AccordionContent data={event} />} />
                                            )
                                        })}
                                    </>
                                }

                                {eventData.filter(event => parseInt(event.day) === hijiriDay).length === 0 &&
                                    <div className="curve-container">
                                        <h1>No Events listed on {hijiriDate}</h1>
                                        <p>If you get to know any events on today please <Link to="/Events">add the event(s)</Link>. Out team will verify and listed in future.</p>
                                    </div>
                                }
                            </>
                        }
                    </>
                </div>
            </div>
        </>
    )
}

const AccordionContent = ({ data }) => {
    return(
        <>
            <ul className="event-list">
                {data.birthDate === '' && data.birthPlace === '' && data.wisaalDate === '' && data.ziyarathPlace === '' && data.additionalInfo === '' && (
                    <li className="empty-event-info">
                        <strong>{data.title}</strong>
                    </li>
                )}
                {data.birthDate !== '' &&(
                    <li>
                        <strong>Birth Day</strong>
                        <span>{data.birthDate}</span>
                    </li>
                )}
                {data.birthPlace !== '' &&(
                    <li>
                        <strong>Birth Place</strong>
                        <span>{data.birthPlace}</span>
                    </li>
                )}
                {data.wisaalDate !== '' &&(
                    <li>
                        <strong>Wisaal Day</strong>
                        <span>{data.wisaalDate}</span>
                    </li>
                )}
                {data.ziyarathPlace !== '' &&(
                    <li>
                        <strong>Ziyarath Place</strong>
                        <span>{data.ziyarathPlace}</span>
                    </li>
                )}
                {data.additionalInfo !== '' &&(
                    <li>
                        <h5>Description</h5>
                        <p>{data.additionalInfo}</p>
                    </li>
                )}
            </ul>
        </>
    )
}

export default Events;