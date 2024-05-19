import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Stars } from 'react-bootstrap-icons';
import TextEffectDropdown, { effects } from './TextEffectDropdown';

function DialogEditor({event, scene}) {
    const [ editMode, setEditMode ] = useState(false);
    const [ editTextEffectsMode, setEditTextEffectsMode ] = useState(false);

    var dialogText = event.dialogText;
    if (typeof dialogText === 'string') dialogText = JSON.parse(dialogText);
    

    return <> {
        dialogText && (
            !editMode ? (
                <pre className="text vn-window w-100" onClick={() => setEditMode(true)} >
                    {
                        dialogText.map((word, index) => <TextEffectDropdown key={`${word.word}_${index}_view`} word={word} editMode={editMode} /> )
                    }
                </pre>
            ) : (
                <div className="w-100">
                    <div className="d-flex justify-content-between">
                        <Button variant="primary" size="sm" className="mt-1" onClick={() => { 
                            setEditTextEffectsMode(!editTextEffectsMode);
                        }}>
                            <Stars size={16} />
                        </Button>
                        <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Save</button>
                    </div>
                    {
                        dialogText.map((word, index) => <TextEffectDropdown key={`${word.word}_${index}`} word={word} editMode={editTextEffectsMode} /> )
                    }
                </div>
            )
        )}
    </>
}

export default DialogEditor