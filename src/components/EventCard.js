import React from 'react';
import "./EventCard.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';

export default function EventCard(item) {
    const { event } = item;
    let { speakers } = event;
    let eventTypeId = "event-type-" + event.event_type;

    speakers = speakers.map((speaker, i) =>
        (i !== speakers.length - 1) ? <span>{speaker.name}, </span> : <span>{speaker.name} </span>
    );

    return (
        <>
            <div class="event-card">
                <div class="event-type" id={eventTypeId}>[  {event.event_type}  ]</div>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <div class="date-time-speakers">
                    <div><span id="heading">Date: </span>{event.date}&emsp;</div>
                    <div><span id="heading">Time: </span>{event.start_time} to {event.end_time}</div>
                    {speakers.length > 0 ? <div><span id="heading">Speakers: </span>{speakers}</div> : <div></div>}
                </div>
                {event.public_url ? <a href={event.public_url}><span class="link"></span></a> : <span></span>}
            </div>
        </>
    );
}
