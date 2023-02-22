import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import "./RelatedEvent.css";

export default function RelatedEvent(item, key) {
    const { relatedEvt } = item;
    const { relatedEvtID, relatedEvtName, relatedEvtType } = relatedEvt;
    const { eventKey } = key;

    return (
        <Link to={'#event-' + relatedEvtID}>
            <button className={"related-event " + relatedEvtType} key={"related-event-" + eventKey}>{relatedEvtName}</button>
        </Link>
    );
}
