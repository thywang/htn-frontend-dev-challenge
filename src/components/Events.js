import React, { useEffect, useState } from 'react';
import EventCard from './EventCard.js';
import "./Events.css";
import axios from 'axios';
import moment from 'moment';

function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("https://api.hackthenorth.com/v3/events").then((data) => {
            // console.log(data);
            setEvents(organizeByStartTime(data?.data));
        });
    }, []);

    return (
        <div class="events">
            <h1 id="events-title" data-text="EVENTS">EVENTS</h1>
            <div class="event-cards">
                {events.map((item, i) => {
                    return (
                        <div key={i}>
                            <EventCard event={item} />
                        </div>
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

// Use this function to organize list of events in order by start_time
const organizeByStartTime = (events) => {
    let organizedEvents = events.map((evt) => {
        return {
            id: evt.id,
            name: evt.name,
            event_type: evt.event_type,
            permission: evt.permission,

            start_time: convertTime(evt.start_time).time,
            end_time: convertTime(evt.end_time).time,
            date: convertTime(evt.start_time).date,

            description: evt.description,
            speakers: evt.speakers,

            public_url: evt.public_url,
            private_url: evt.private_url,
            related_events: evt.related_events
        };
    });
    // Returning 1 means b takes precendence
    // Returning -1 means a takes precedence
    return organizedEvents.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1);
};

export default Events;