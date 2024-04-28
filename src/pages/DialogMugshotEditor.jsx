import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { Button, Form } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import MugshotSelector from './MugshotSelector'; // Adjust the path according to your file structure

const DialogMugshotEditor = () => {

    return (
        <>
            <div className="speaker vn-window">
                <MugshotSelector />
            </div>
        </>
    );
};

export default DialogMugshotEditor;
