import React from 'react';
import "./RelatedEvent.css";

export default function RelatedEvent(item, key) {
    const { relatedEvt } = item;
    const { relatedEvtID, relatedEvtName, relatedEvtType } = relatedEvt;
    const { eventKey } = key;

    return (
        <a href={"#event-" + relatedEvtID}>
            <button class={"related-event " + relatedEvtType} key={"related-event-" + eventKey}>{relatedEvtName}</button>
        </a>
    );
}
