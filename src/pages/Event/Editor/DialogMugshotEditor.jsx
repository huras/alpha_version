import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../../context/AppContext';
import { Button, Form } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import MugshotSelector from './Mugshot/MugshotSelector'; // Adjust the path according to your file structure

const DialogMugshotEditor = ({event, setEvent, project}) => {

    return (
        <>
            <div className="speaker vn-window">
                <MugshotSelector event={event} setEvent={setEvent} project={project} />
            </div>
        </>
    );
};

export default DialogMugshotEditor;
