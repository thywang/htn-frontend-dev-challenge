import React from 'react';
import RelatedEvent from './RelatedEvent.js';
import "./EventCard.css";

export default function EventCard(item) {
    const { event } = item;
    let { id, event_type, speakers } = event;
    let eventTypeId = "event-type-" + event_type;
    let eventKey = id;

    speakers = speakers.map((speaker, i) =>
        (i !== speakers.length - 1) ? <span>{speaker.name}, </span> : <span>{speaker.name} </span>
    );

    return (
        <div className="event-card" key={"event-" + eventKey} id={"event-" + eventKey}>
            <div className="event-type" id={eventTypeId}>[  {event_type}  ]</div>
            <h3>{event.name}</h3>
            <p className="space">{event.description}</p>
            <div className="event-info">
                <div className="date-time-speakers">
                    <div><span className="heading">Date: </span>{event.date}&emsp;</div>
                    <div><span className="heading">Time: </span>{event.start_time} to {event.end_time}</div>
                    {speakers.length > 0 ? <div><span className="heading">Speakers: </span>{speakers}</div> : ''}
                </div>
                {event.public_url !== "" ? <span><a className="link" href={event.public_url} target="_blank" rel="noreferrer noopener">View Recording</a></span> : ''}
                {event.private_url ? <a className="private-link" href={event.private_url} target="_blank" rel="noreferrer noopener"><button className="private-link-button">Go to event</button></a> : ''}
                {event.related_events.length > 0 ? <span className="heading">Related events:</span> : ''}
                <div className="related-events">
                    {event.related_events.map((item, i) => {
                        return (
                            <RelatedEvent relatedEvt={item} key={i} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
