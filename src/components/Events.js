import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard.js';
import "./Events.css";
import axios from 'axios';
import moment from 'moment';

function Events(props) {
    const [events, setEvents] = useState([]);
    const { isAuthed } = props;

    useEffect(() => {
        axios.get("https://api.hackthenorth.com/v3/events").then((data) => {
            // console.log(data);
            setEvents(organizeEvents(data?.data, true));
        });
    }, []);

    return (
        <div className="events">
            {isAuthed ? '' : <Link to='/login'><button id="login-button">Log In</button></Link>}
            <h1 id="events-title" data-text="EVENTS">EVENTS</h1>
            <div className="event-cards">
                {filterEventsByAuthentication(events, isAuthed).map((item) => {
                    return (
                        <EventCard event={item} />
                    );
                })}
            </div>
        </div>
    );
}

// Use this function to convert a unix timestamp to datetime
const convertTime = (unixTimestamp) => {
    const t = new Date(unixTimestamp);
    return { date: moment(t).format('ll'), time: moment(t).format('h:mm A') };
};

// Convert to all times in events to datetime

// Use this function to organize list of events in order by start_time and add information for related events
const organizeEvents = (events) => {
    // Sort in ascending time (in ms)
    const compareTime = (a, b) => {
        if (a.end_time < b.end_time || (a.end_time === b.end_time && a.start_time > b.start_time))
            return -1;
        if (a.end_time > b.end_time || (a.end_time === b.end_time && a.start_time < b.start_time))
            return 1;
        return 0;
    };

    let organizedEvents = events.sort(compareTime);

    organizedEvents = organizedEvents.map((evt) => {
        let relatedEvents =
            evt.related_events.map(
                (relatedEvtID) => {
                    let relatedEvt = organizedEvents.find(evt => evt.id === relatedEvtID);
                    return {
                        relatedEvtID: relatedEvtID,
                        relatedEvtName: relatedEvt.name,
                        relatedEvtType: relatedEvt.event_type,
                        permission: relatedEvt.permission
                    };
                });

        let { start_time, end_time } = evt;
        return {
            ...evt,
            ...{
                start_time: convertTime(start_time).time,
                end_time: convertTime(end_time).time,
                date: convertTime(start_time).date,
                related_events: relatedEvents
            }
        };
    });
    return organizedEvents;
};

// Use this function to filter through events based on if user is authed
const filterEventsByAuthentication = (events, isAuthed = false) => {
    let filteredEvents = events.filter((evt) => {
        return isAuthed ? evt : evt.permission === "public";
    });

    filteredEvents = filteredEvents.map((evt) => {
        if (!isAuthed) {
            // Remove private urls if not authed
            evt = isAuthed ? evt : omit(evt, ["private_url"]);
            // Remove private related events if not authed
            evt.related_events = evt.related_events.filter((evt) => {
                return isAuthed ? evt : evt.permission === "public";
            });
        }
        return evt;
    });

    return filteredEvents;
};

/** 
 * Use this function to omit any number of properties
 * from an object.
 * 
 * @param {Object} obj      The object.
 * @param {Object} props    The name(s) of property or properties to omit.
 */
const omit = (obj, ...props) => {
    const result = { ...obj };
    props.forEach(function (prop) {
        delete result[prop];
    });
    return result;
};

export default Events;